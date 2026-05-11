import os
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

class MedAssistRAG:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings()
        self.persist_directory = 'backend/rag/db'
        self.vector_db = None
        self._init_db()

    def _init_db(self):
        # Initialize or load the vector database
        if not os.path.exists(self.persist_directory):
            os.makedirs(self.persist_directory)
        
        self.vector_db = Chroma(
            persist_directory=self.persist_directory,
            embedding_function=self.embeddings
        )

    def query(self, user_query):
        if not self.vector_db:
            return "Knowledge base not initialized."

        llm = ChatOpenAI(model_name="gpt-4", temperature=0.2)
        
        template = """
        You are a highly qualified medical assistant. Use the following pieces of context to answer the user's medical question.
        If you don't know the answer, just say that you don't know, don't try to make up an answer.
        Always provide a disclaimer that this is not professional medical advice.

        Context: {context}
        Question: {question}

        Answer:"""
        
        prompt = PromptTemplate(
            template=template,
            input_variables=["context", "question"]
        )

        chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=self.vector_db.as_retriever(),
            chain_type_kwargs={"prompt": prompt}
        )

        response = chain.invoke(user_query)
        return response['result']

    def add_documents(self, documents):
        # Method to add new medical documents to the knowledge base
        self.vector_db.add_documents(documents)
        self.vector_db.persist()

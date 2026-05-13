"""
Test script for MedAssist AI Symptom Analysis API
Run this after starting the FastAPI server to verify everything works
"""

import requests
import json

API_URL = "http://localhost:8000"

def test_health_check():
    """Test if the API is running"""
    print("🔍 Testing health check endpoint...")
    try:
        response = requests.get(f"{API_URL}/health")
        if response.status_code == 200:
            data = response.json()
            print("✅ Health check passed!")
            print(f"   Status: {data['status']}")
            print(f"   Gemini configured: {data['gemini_configured']}")
            return True
        else:
            print(f"❌ Health check failed with status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Is the server running?")
        print("   Run: python api/main.py")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_symptom_analysis():
    """Test symptom analysis endpoint"""
    print("\n🔍 Testing symptom analysis endpoint...")
    
    test_symptoms = "I have a persistent headache for 3 days, fever around 38.5°C, fatigue, and body aches. I also have difficulty sleeping."
    
    try:
        response = requests.post(
            f"{API_URL}/analyze-symptoms",
            json={
                "symptoms": test_symptoms,
                "language": "en"
            },
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Symptom analysis successful!")
            print(f"\n📋 Results:")
            print(f"   Disease: {data['disease_name']}")
            print(f"   Severity: {data['severity']}")
            print(f"   Causes: {', '.join(data['causes'][:2])}...")
            print(f"   Treatments: {', '.join(data['treatments'][:2])}...")
            print(f"\n✨ Full response:")
            print(json.dumps(data, indent=2))
            return True
        else:
            print(f"❌ Analysis failed with status {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    """Run all tests"""
    print("=" * 60)
    print("🧪 MedAssist AI API Test Suite")
    print("=" * 60)
    
    # Test 1: Health check
    health_ok = test_health_check()
    
    if not health_ok:
        print("\n⚠️  Cannot proceed with tests. Please start the server first.")
        print("   Run: python api/main.py")
        return
    
    # Test 2: Symptom analysis
    analysis_ok = test_symptom_analysis()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 Test Summary")
    print("=" * 60)
    print(f"Health Check: {'✅ PASSED' if health_ok else '❌ FAILED'}")
    print(f"Symptom Analysis: {'✅ PASSED' if analysis_ok else '❌ FAILED'}")
    
    if health_ok and analysis_ok:
        print("\n🎉 All tests passed! Your API is working correctly.")
        print("   You can now open new-diagnosis.html in your browser.")
    else:
        print("\n⚠️  Some tests failed. Please check the error messages above.")

if __name__ == "__main__":
    main()

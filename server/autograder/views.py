from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

# view for creating an autograder, handles the POST request from frontend
@api_view(['POST'])
@permission_classes([AllowAny])
def create_autograder(request):
    # extracting data sent from the frontend
    data = request.data
    language = data.get('language')
    test_cases = data.get('testCases')

    # for debugging purposes
    print(f"Received autograder.")
    print(f"Language: {language}")
    print(f"Test Cases: {test_cases}")

    # can process the data here?

    

    return Response({"message": "Autograder received successfully!"})


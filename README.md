# SDE Lab 03: REST ADVANCED
Please read this document carefully. 

## BEFORE THE LAB

### VirtualBox and OVA image 
Prior to the lab, make sure to install VirtualBox and download the OVA image. The links for both are as follows:

- [For M1/M2 Mac](https://drive.google.com/drive/folders/1u4zsOALoeyQMj57nwloiyVjxLmurecRN))
- [For Windows/macOS (Intel)](https://drive.google.com/drive/folders/1eZJKOwXMWPeBg7dEr6O5swpFzZraHSsc)

### SUBSCRIPTION of the APIs
This lab is planned in such a way that we are using three different APIS for demonstration purposes and exploring the logic/process of the REST Service. We are using Humor API to create the random jokes, and the jokes created are translated to Italian using Microsoft Translator further, the translated texts are converted to Speech using the Text to Speech APIs. 

All the APIs we are using are from the [Rapid API](https://rapidapi.com/) website so first you have to create an account and sign up. 

After creating an account, in order to use the APIs, you need to subscribe for each APIs (don’t worry, they are free) and get your own API keys which you would be required to use during the Examples and Assignment. 

The process of subscribing for different APIs are same. As a demo, we have shown you the process for only one API service. You can follow the same process for other APIs. 
Here are the links  
1. [Humor API](https://rapidapi.com/humorapi/api/humor-jokes-and-memes/)
2. [Microsoft Translator API](https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-translator-text)
3. [Text to Speech API](https://rapidapi.com/yhwucss/api/text-to-speech53/)

Process for logging in and subscribing to the APIS to get your API keys:
![Alt text](https://github.com/Yusuke-Sugihara/SDE_LAB3/blob/main/Images/Image_4.JPG)
![Alt text](https://github.com/Yusuke-Sugihara/SDE_LAB3/blob/main/Images/Image_5.JPG)
![Alt text](https://github.com/Yusuke-Sugihara/SDE_LAB3/blob/main/Images/Image_6.JPG)
![Alt text](https://github.com/Yusuke-Sugihara/SDE_LAB3/blob/main/Images/Image_7.JPG)
![Alt text](https://github.com/Yusuke-Sugihara/SDE_LAB3/blob/main/Images/Image_8.JPG)
![Alt text](https://github.com/Yusuke-Sugihara/SDE_LAB3/blob/main/Images/Image_9.JPG)

Following a similar process you can subscribe other two APIs and get the unique keys. If you don't subscribe you cannot test the endpoint.

# API CONTRACT
The one and only way to between Front-End and Back-End to understand each other

# MODEL
## User
- id: int(11)
- email: varchar(40)
- name: varchar(40)
- password:varchar(100)
- angkatan : varchar(4)
- prodi : varchar(100)

## Post
- id: int(11)
- id_user: int(11)
- content: text
- createdAt: timestamp
- updatedAt: timestamp

## Comment
- id: int(11)
- id_user: int(11)
- id_post: int(11)
- content: text

## Image
- id: int(11)
- id_post: int(11)
- link: varchar(512)

## Podcast
- id: int(11)
- id_post: int(11)
- link: varchar(512)

P.S. varchar and text can refer to String

# ENDPOINT
## User (/user)

### Register User (POST /user/register)

***Request (body): JSON***

    {
        "email"     : "irvanriskinugraha90@gmail.com"
        "name"      : "Irvan"
        "password"  : "irvan"
    }

***Response: JSON***

    200:
        {
            "success": true,
            "email": "irvanriskinugraha90@gmail.com",
            "name": "Irvan",
            "password": "$2a$10$c2lgbFQ/L5GHtOG4ueFKd.0yyn40bb/SVrXL0ayl2thk9LskcbpM2",
            "message": "Register success"
        }
    
    406:
        {
            "message": "Incorrect email"
        }

    409:
        {
            "message": "Email already registered"
        }

    500:
        {
            "success": false,
            "error" : "Internal server error"
        }
    
### Login User (POST /user/login)
***Request (Body): JSON***

    {
	    "email" : "irvanriskinugraha90@gmail.com",
	    "password" : "aldi"
    }

***Response: JSON***

    200:
        {
            "success": true,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo3LCJlbWFpbCI6ImlydmFucmlza2ludWdyYWhhOTBAZ21haWwuY29tIiwiaWF0IjoxNTgyMzc1MzQ2fQ.vEgQmQiLTECRcaR-bSCH_OcfEXRIEE6VSKxMcvV0Vkg"
        }

    406:
        {
            "message": "Wrong Password"
        }

    404:
        {
            "message": "User Not Registered"
        }

    500:
        {
            "success": false,
            "error" : "Internal server error"
        }
    502:
        {
            "message": "JWT Error, can't create token"
        }
### Get All Users (GET /user)
***Response: JSON***

    200:
        {
            "success": true,
            "data": [
                {
                    "id": 7,
                    "name": "Irvan",
                    "email": "irvanriskinugraha90@gmail.com",
                    "password": "$2a$10$JGhcCxv8k1DEgDaTrksBPe01MIC5j/xkZmgP8F384F0C3HT4sFw0W"
                }
            ]
        }


    500:
        {
            “success” : false,             
            “message” : “internal server error”
        }

### Get User By Id (GET /user/:id)
***Request (params): id***

***Response : JSON***

    200:
        {
            "success": true,
            "user": {
                "id": 7,
                "name": "Irvan",
                "email": "irvanriskinugraha90@gmail.com",
                "password": "$2a$10$JGhcCxv8k1DEgDaTrksBPe01MIC5j/xkZmgP8F384F0C3HT4sFw0W"
            }
        }

    404:
    {
      "message": "User Not Found"
    }

    500:
    {
        "success" : false,
        "message : "Internal server error
    }

### Update User Name (PUT /user/:id)
***Request (params): id***

***Request (body): JSON***

    {
	    "name" : "Irvan Rizki"
    }

***Response : JSON***

    200:
    {
        "success": true,
        "message": "id_user 7 has been updated to Irvan Rizki"
    }

    401:
    {
        "message": "Wrong Token"
    }

    403:
    {
        "message": "Login First"
    }

    404:
    {
        "message": "User Not Found"
    }

    500:
    {
        "success" : false,
        "message : "Internal server error
    }

    500:
    {
        "message" : "Invalid signature"
    }

### Delete User Name (DELETE /user/:id)
***Request (params): id***

    200:
    {
        "success": true,
        "message": "deleted user id 7"
    }

    401:
    {
        "message": "Wrong Token"
    }

    403:
    {
        "message": "Login First"
    }

    404:
    {
        "message": "User Not Found"
    }

    500:
    {
        "success" : false,
        "message : "Internal server error
    }

    500:
    {
        "message" : "Invalid signature"
    }

## POST (/post)
### Create Post (POST /post)
***Request (headers): (Required) Authorization: bearer <JWT_TOKEN>***

***Request (Body): JSON***
    
    {
	    "content" : "Workshop"
    }

***Response: JSON***

    200:
    {
        "success": true,
        "id_user": 4,
        "post": "Workshop",
        "message": "Post Created"
    }

    401:
    {
        "message": "Wrong Token"
    }

    403:
    {
        "message": "Login First"
    }

    500:
    {
        "message" : "Internal Server Error"
    }
    
    500:
    {
        "message" : "Invalid signature"
    }

### Get Post By Id (GET /post/:id_post)
***Request (params): id_post***

***Response: JSON***

    200:
    {
        "success": true,
        "post": {
            "id": 6,
            "id_user": 4,
            "content": "Workshop",
            "createdAt": "2020-02-22T04:05:21.000Z",
            "updatedAt": "2020-02-22T04:05:21.000Z"
        }
    }

    404:
    {
        "success": false,
        "message": "Post Not Found"
    }

    500:
    {
       "message" : "Internal Server Error"    
    }

    500:
    {
        "message" : "Invalid signature"
    }

### Update Post (PUT /post/:id_post)
***Request (params): id_post***

***Request (headers): (Required) Authorization: bearer <JWT_TOKEN>***

***Request (Body): JSON***

    {
	    "content" : "Workshop BCC 2019"
    }

***Response: JSON***

    200:
    {
        "success": true,
        "content": "Workshop BCC 2019",
        "message": "6 id_post updated"
    }

    401:
    {
        "message": "Wrong Token"
    }

    403:
    {
        "message": "Login First"
    }

    404:
    {
        "message": "Post Not Found"
    }

    500:
    {
       "message" : "Internal Server Error"    
    }

    500:
    {
        "message" : "Invalid signature"
    }

### Delete Post (DELETE /post/:id_post)
***Request (params): id_post***

***Request (headers): (Required) Authorization: bearer <JWT_TOKEN>***

***Response: JSON***

    200:
    {
        "success": true,
        "message": "6 post deleted from user 4"
    }

    401:
    {
        "message": "Wrong Token"
    }

    403:
    {
        "message": "Login First"
    }

    404:
    {
        "message": "Post Not Found"
    }

    500:
    {
       "message" : "Internal Server Error"    
    }

    500:
    {
        "message" : "Invalid signature"
    }

## Comment (/comment)

### Post Comment On Post (POST /comment/:id_post)
***Request (params): id_post***

***Request (headers): (Required) Authorization: bearer <JWT_TOKEN>***

***Request (body): JSON***

    {
	    "content" : "Legenda Hidup"
    }

***Response: JSON***

    200:
    {
        "success": true,
        "id_post": "9",
        "id_user": 1,
        "content": "Legenda Hidup",
        "message": "Comment Added"
    }

    401:
    {
        "message": "Wrong Token"
    }

    403:
    {
        "message": "Login First"
    }

    404:
    {
        "message": "Post Not Found"
    }

    500:
    {
       "message" : "Internal Server Error"    
    }

    500:
    {
        "message" : "Invalid signature"
    }

### Update Comment (PUT /comment/:id_comment)
***Request (params): id_comment***

***Request (headers): (Required) Authorization: bearer <JWT_TOKEN>***

***Request (body): JSON***

    {
	    "content" : "Halo Dunia"
    }

***Response: JSON***

    200:
    {
        "success": true,
        "content": "Halo Dunia",
        "message": "3 id_comment updated"
    } 

    401:
    {
        "message": "Wrong Token"
    }

    403:
    {
        "message": "Login First"
    }

    404:
    {
        "message": "Comment Not Found"
    }

    500:
    {
       "message" : "Internal Server Error"    
    }

    500:
    {
        "message" : "Invalid signature"
    }

### Get Comment By Post (GET /comment/:id_post)
***Request (params): id_post***

***Response: JSON***

    200:
    {
        "success": true,
        "comments": [
            {
                "id": 4,
                "id_user": 1,
                "id_post": 1,
                "content": "Legenda Hidup"
            }
        ]
    }

    500:
    {
       "message" : "Internal Server Error"    
    }

### Delete Comment (DELETE /comment/:id_comment)
***Request (params): id_comment***

***Request (headers): (Required) Authorization: bearer <JWT_TOKEN>***

***Response: JSON***

    200:
    {
        "success": true,
        "message": "deleted comment id 4"
    }

    401:
    {
        "message": "Wrong Token"
    }

    403:
    {
        "message": "Login First"
    }

    404:
    {
        "message": "Comment Not Found"
    }

    500:
    {
       "message" : "Internal Server Error"    
    }

    500:
    {
        "message" : "Invalid signature"
    }

## Image (/image)

### Upload Image (POST /image/upload/:id_post)
***Request (multipart): image***

***Request (headers): (Required) Authorization: bearer <JWT_TOKEN>***

***Response: JSON***

    200:
    {
        "success": true,
        "message": "File uploaded",
        "link": "uploads/images/7_1_IMG_20170705_110748_HDR.jpg"
    }

    401:
    {
        "message": "Wrong Token"
    }

    403:
    {
        "message": "Login First"
    }

    404:
    {
        "message": "Post Not Found"
    }

    406:
    {
        "message": "Not support file type except jpg, jpeg, png"
    }
    
    500:
    {
       "message" : "Internal Server Error"    
    }

    500:
    {
        "message" : "Invalid signature"
    }

### Delete Image By Id (DELETE /image/:id)
***Request (params): id***

***Request (headers): (Required) Authorization: bearer <JWT_TOKEN>***

***Response: JSON***

    200:
    {
        "success": true,
        "id_podcast": "2",
        "message": "deleted"
    }

    401:
    {
        "message": "Wrong Token"
    }

    403:
    {
        "message": "Login First"
    }

    404:
    {
        "message": "Image Not Found"
    }

    500:
    {
       "message" : "Internal Server Error"    
    }

    500:
    {
        "message" : "Invalid signature"
    }

### Show Image By Post (GET /image/:id_post)
***Request (params): id_post***

***Response: JSON***

    200:
    {
        "success": true,
        "images": [
            {
                "id": 17,
                "id_post": 1,
                "link": "uploads/images/7_1_IMG_20170705_110748_HDR.jpg"
            }
        ]
    }

    404:
    {
        "message": "Image Not Found At id_post 99"
    }

    500:
    {
       "message" : "Internal Server Error"    
    }

### Show Podcast On HTM (GET /podcast/:id/show)
***Request (params): id***

P.S. Put /image/:id/show in URL

### Stream Podcast (GET /podcast/:id/stream)
***Request (params): id***

P.S. Put /image/open/:id in image src

***Response JSON***

    404:
    {
        "message" : "Image Not Found"
    }

    500:
    {
       "message" : "Internal Server Error"    
    }

## Podcast (/podcast)

### Upload Podcast (POST /podcast/upload/:id_post)
***Request (multipart): podcast***

***Request (headers): (Required) Authorization: bearer <JWT_TOKEN>***

***Response: JSON***

    200:
    {
        "success": true,
        "link": "uploads/podcasts/7_7_Hot Food POEM Kids' Poems and Stories With Michael Rosen.mp3",
        "message": "Podcast uploaded"
    }

    401:
    {
        "message": "Wrong Token"
    }

    403:
    {
        "message": "Login First"
    }

    404:
    {
        "message": "Post Not Found"
    }

    406:
    {
        "message": "Not support file type except mp3"
    }
    
    500:
    {
       "message" : "Internal Server Error"    
    }

    500:
    {
        "message" : "Invalid signature"
    }

### Delete Podcast By Id (DELETE /podcast/:id)
***Request (params): id***

***Request (headers): (Required) Authorization: bearer <JWT_TOKEN>***

***Response: JSON***

    200:
    {
        "success": true,
        "id_podcast": "2",
        "message": "deleted"
    }

    401:
    {
        "message": "Wrong Token"
    }

    403:
    {
        "message": "Login First"
    }

    404:
    {
        "message": "Podcast Not Found"
    }

    500:
    {
       "message" : "Internal Server Error"    
    }

    500:
    {
        "message" : "Invalid signature"
    }

### Show Podcast By Post (GET /podcast/:id_post)
***Request (params): id_post***

***Response: JSON***

    200:
    {
        "success": true,
        "podcasts": [
            {
                "id": 4,
                "id_post": 7,
                "link": "uploads/podcasts/7_7_Hot Food POEM Kids' Poems and Stories With Michael Rosen.mp3"
            }
        ]
    }

    404:
    {
        "message": "Podcast Not Found At id_post 99"
    }

    500:
    {
       "message" : "Internal Server Error"    
    }

### Show Podcast On HTM (GET /podcast/:id/show)
***Request (params): id***

P.S. Put /podcast/:id/show in URL

### Stream Podcast (GET /podcast/:id/stream)
***Request (params): id***

P.S. Put /podcast/stream/:id in audio src

***Response JSON***

    404:
    {
        "message" : "Podcast Not Found"
    }

    500:
    {
       "message" : "Internal Server Error"    
    }

## TBA

### Image Testing on HTML

### Only accept mp3 on podcast

### Only accept jpeg and png on podcast
# MemeCraft

**Authors**: Brady Camp, Harvey Francois, Jeffrey Jenkins, Micha Davis, Michael Campbell
**Version**: 1.4.0

## Overview

A simple application that allows the user to create their own customized memes from any of 100 popular meme templates. The user can Create, Read, Update, and Delete a personal gallery of customized memes, share memes to several popular social media sites. This site leverages the ImgFlip Meme API and uses an Express backend with MongoDB to store user creations.

## Problem Domain

Sometimes you can't find the meme that adequately expresses how you feel. This site will aim to provide a quick, easy interface for creating custom memes to amaze your friends.

## Getting Started

Download the code onto your local machine and implement the following code into your terminal:

```bash
npm i
npm start
```

## Architecture

- [Wireframe](resources/meme-craft%20wireframe.jpg)
- [Schema](resources/meme-craft-schema.jpg)
- [Domain Model](resources/meme-craft%20domain%20model.jpg)
- [State and Props Diagram](resources/meme-craft-props-state-flow.jpg)

### Technologies

- JavaScript
- ReactJS
- React-Bootstrap
- MongoDB
- Express
- NodeJS
- Masonry

## API Endpoints

### GET /memes Response

```json
{
  "success": true,
  "data": {
    "memes": [
      {
        "id": "181913649",
        "name": "Drake Hotline Bling",
        "url": "https://i.imgflip.com/30b1gx.jpg",
        "width": 1200,
        "height": 1200,
        "box_count": 2
      },
      {
        "id": "87743020",
        "name": "Two Buttons",
        "url": "https://i.imgflip.com/1g8my4.jpg",
        "width": 600,
        "height": 908,
        "box_count": 3
      },
      // ...and 98 more just like this
    ]
  }
}
```

### POST /memes Response

Success:

```json
{
  "success": true,
  "data": {
    "url": "https://i.imgflip.com/67k84i.jpg",
    "page_url": "https://imgflip.com/i/67k84i"
  }
}
```

Failure:

```json
{
    "success": false,
    "error_message": "Some hopefully-useful statement about why it failed"
}
```

### GET /memeDB Response

```json
{
  "_id": "62295a81bde528b2acb30f09",
  "userName": "jeffreyjtech@gmail.com",
  "url": "https://i.imgflip.com/683crc.jpg",
  "page_url": "https://imgflip.com/i/683crc",
  "boxes": [
    {
      "text": "Our merge"
    },
    {
      "text": "GitHub review"
    },
    {
      "text": "Failed to deploy"
    }
  ],
  "template": {
    "id": "79132341",
    "name": "Bike Fall",
    "url": "https://i.imgflip.com/1b42wl.jpg",
    "width": 500,
    "height": 680,
    "box_count": 3
  },
  "__v": 0
}
```

### POST /memesDB Response

```json
{
  "userName":"jeffreyjtech@gmail.com",
  "url":"https://i.imgflip.com/68c0d6.jpg",
  "page_url":"https://imgflip.com/i/68c0d6",
  "boxes":
    [
      {
        "text":"Work hard on Documentation"
      },
      {
        "text":"Wing it"
      },
      {
        "text":"Me"
      }
    ],
  "template":
    {
      "id":"87743020",
      "name":"Two Buttons",
      "url":"https://i.imgflip.com/1g8my4.jpg",
      "width":600,
      "height":908,
      "box_count":3
    },
  "_id":"622ba80e149f0ec32926943b",
  "__v":0
}
```

### PUT /memeDB:id Response

Status: 200 OK

```json
{
  "_id": "62295a81bde528b2acb30f09",
  "url": "https://i.imgflip.com/30b1gx.jpg",
  "boxes": []
}
```

### DELETE /memeDB:id Response

Status: 200 OK

```json
meme deleted
```

## Credit and Collaborations

- [ImageFlip API](https://imgflip.com/api)
- [Styling Library](https://bootswatch.com/quartz/)
- [Deployment Source](https://react-bootstrap.netlify.app/)
- [Styling Layout Library](https://github.com/paulcollett/react-masonry-css#readme)

## More Documentation

Documentation for this project can be found in the [MemeCraft Documents repository](https://github.com/Deprecated-Dependencies/meme-craft-documents).

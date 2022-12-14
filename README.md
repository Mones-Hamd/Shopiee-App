# Shopiee-App

shopiee app is a platform where you can sell and buy your used items or by a second hand items .


![Logo](https://github.com/Mones-Hamd/Shopiee-App/blob/main/client/shopiee/src/imgs/logo.png)

## Demo

 you can try Shopiee V1.0.0 app <a href="https://illustrious-snickerdoodle-4d5125.netlify.app/auth"> here .</a>

Or you can get started by simply clone the repo and install the dependencies in the root folder


## Installation

Install Shopiee with npm

```bash
   npm install 
   npm run dev
  
```
 Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.
## Tech Stack

**Client:** React,MUI,

**Server:** Node, Express ,JWT ,Cors ,Bcrypt


## Must have:
- [x] Ability to sign in and sign up using google account "Oauth 2" and for sure custom sign in/sign up "jwt, bcrybt".

- [x] User can post his/her item that he needs to sell and add a item photo , and add tags .

- [x] Like his items and other's item .

- [x] Edit and delete his item.

- [x] Search by tags or title .

- [x] Show single item with recommended items .

- [x] pagination .

## Roadmap
- [x] Add recommended items

- [x] Add comments 

- [ ] Realtime Chat

- [ ] Add user profile 

- [ ] Add payment method 



## API Reference

#### Get all items

```http
  GET /api/posts
```
#### search by title and tags
```http
  GET /api/search?searchQuery=<value>&&tags=<value>
```

#### Get item

```http
  GET /api/posts/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


### Protected route

#### Post  item

```http
  Post /api/posts
```


#### Update item

```http
  PUT /api/posts/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  `Id`  | `string` | **Required**. Id of item to PUT |

#### Delete item
```http
  DELETE /api/posts/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  `Id`  | `string` | **Required**. Id of item to Delete |




## Author

- [@MonesHamd](https://www.github.com/Mones-Hamd)


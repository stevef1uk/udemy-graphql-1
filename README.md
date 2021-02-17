Holding the work as I work through the Udemmy training : AWS AppSync & Amplify with React & GraphQL - Complete Guide
run in server directory using the command: npx nodemon app

The URL will be localhost:4000/graphql

Pre-requisites are to havde node and npm installed

Note: assures a number of node modules have been installed in the express directory as explained in the videos. They can be added by going into the server directory and running the command: node install <package> -g
where the packages are mostly found in the package.json file e.g.:

nodemon
express
express-graphql
graphql
lodash


Some test queries:


{
  user(id: "1") {
    name
    age
    profession
    id
    posts {
      comment
      id
    }
    hobbies{
      id
      title
      description
    }
  }
}


mutation { 
  createUser(
    name: "Zeus",
    age:5001,
    profession: "Historic God")
  {
  id
  name
  profession
  }
}


mutation {
  createPost(comment: "This is a comment", userId: "1") {
    id
    comment
    user {
      id
      name
    }
  }
}


mutation {
  createHobby(title: "Bird watching", 
    description: "Watching wld birds",
    userId: "1") {
    id
    title
    description
    user {
      id,
      name,
      profession
    }
  }
}





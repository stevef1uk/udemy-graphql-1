const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = require('graphql')

const graphql = require('graphql')
var _ = require('lodash')

// dummy data
var usersData = [
    {id: '1', name: 'Bond', age: 36, profession: 'Spy'},
    {id: '2', name: 'Steve', age: 59 , profession: 'HODA'},
    {id: '3', name: 'Sarah', age: 21 , profession: 'Retired'},
]

var hobbiesData = [
    {id: '1', title: 'Programming', description: 'Playinhg technically with computers', userId: '1'}, 
    {id: '2', title: 'Skiing', description: 'Sliding down snow on skis', userId: '1'  },
    {id: '3', title: 'Photography', description: 'Going to nice places to take pictures using a camera', userId: '3'  }
]

var postsData = [
    {id: '1', comment: 'Building working software is hard!', userId: '1'},
    {id: '2', comment: 'GraphQL is amazing :-)', userId: '1'},
    {id: '3', comment: 'What an amazing picture', userId: '3'}
]


// Create types
const UserType = new GraphQLObjectType( {
    name: 'User',
    description: 'Documentatuon for user',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString},
        posts: {
            type: GraphQLList( PostType),
            resolve( parent, args) {
                return _.filter(postsData, {userId: parent.id})
            }
        },
        hobbies: {
            type: GraphQLList( HobbyType),
            resolve( parent, args) {
                return _.filter(hobbiesData, {userId: parent.id})
            }
        },
    })
})

const HobbyType = new GraphQLObjectType( {
    name: 'Hobby',
    description: 'Hobby description',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, {id: parent.userId })
            }
        }
    })
})

const PostType = new GraphQLObjectType( {
    name: 'Post',
    description: 'Post description',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, {id: parent.userId })
            }
        }
    })
})

//Root Query
const RootQuery = new GraphQLObjectType( {
    name: 'RootQueryType',
    description: 'Description',
    fields: {
       user: {
           type: UserType,
           args: {id: {type: GraphQLString}},
           resolve( parent, args) {
               // we resolve with data
               // get and return data frm a data source
                return _.find(usersData, {id: args.id})
                /*
                {
                    user(id: "1") {
                    name  
                    age
                    profession
                    id
                    }
                } */
            }
        },
        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},
            resolve( parent, args) {
                // return data for our hobby
                return _.find(hobbiesData, {id: args.id})
                /*
                {
                    hobby(id: "1") {
                    title  
                    description
                    id
                    }
                } 
                {
                hobby(id: 1) {
                    id
                title
                    description

                    user{
                    id
                    name
                    profession
                    }
                }
                }*/

           }
       },
       posts: {
        type: PostType,
        args: {id: {type: GraphQLID}},
        resolve( parent, args) {
            // return data for our posts
            return _.find(postsData, {id: args.id})
            /*
            {
                posts(id: "1") {
                comment  
                }
            } */

           } 
       },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
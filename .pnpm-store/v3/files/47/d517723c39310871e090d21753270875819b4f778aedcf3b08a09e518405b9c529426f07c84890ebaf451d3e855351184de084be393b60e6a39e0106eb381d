var contentful = require('contentful-management')
var client = contentful.createClient({
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: 'YOUR_ACCESS_TOKEN',
})

async function run() {
  // This API call will request a space with the specified ID
  var space = await client.getSpace('spaceId')

  var environment = await space.getEnvironment('master')

  // Now that we have a space, we can get entries from that space
  await environment.getEntries()

  // let's get a content type
  await environment.getContentType('product').then((contentType) => {
    // and now let's update its name
    contentType.name = 'New Product'
    return contentType.update().then((updatedContentType) => {
      console.log('Update was successful')
      return updatedContentType
    })
  })
}

run()

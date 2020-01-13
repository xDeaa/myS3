# CODEFLIX
## This project is about API + storage.

### Feature done :
#### BACK :
    - API server using express and typeORM with Typescript + Babel
    - Use snakecase and lowercase table names, jwt
    - A user is describe with: uuid, nickname, email, password
    - CRUD Routes user operations, bucket and list all objects
    - Send an email on user creation
    - A bucket is describe with: id, name and belongs to a user
    - A blob is describe with: id, name, path, size and belongs to a bucket
    - Routes add, delete, retrive, duplicate, get path and size of a blob 

#### FRONT :
    - Handle all user API actions
    - Use Hook/Context with React

### Feature to do :
#### BACK :
    - Add user password reset e-mail workflow

#### FRONT :
    - HAVE TO transform you application to handle Server-side Rendering (SSR)
    - One click sharing (Well, on each blob, we can generate a static public link for the assets)
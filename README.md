# Hướng dẫn thực hiện.
- follow: [Todo-JWT](https://github.com/strongloop/loopback-next/tree/master/examples/todo-jwt)
- view result: [example](https://github.com/NguyenVanKhoi2603/post-loopback4-jwt-example.git)
> Tạo project
```
lb4 app
```
> Tạo model
````
lb4 model

// Post: id(string), title(string), content(string), timestamp(date)
// User: id(string), username(string), email(string)
// UserCredential: id(string), password(string)
````
--> kết quả xem : [model](https://github.com/NguyenVanKhoi2603/post-loopback4-jwt-example/tree/master/src/models)
> tạo datasouce
````
lb4 datasource
// name: db
// postgresql
// host: localhost
// port: 5432
// user: postgre
// passwpord:
// database name: test
````
````
import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'db',
  connector: 'postgresql',
  url: '',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '',
  database: 'test'
};

@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

````
> Tạo Relation
````
lb4 relation

// hasOne: User -> userCredential.
// belongsTo: userCredential -> User.
````
> Migrate model
````
npm run build
npm run migrate
````
--> table được tạo ở database, kiểm tra.
> tạo controller
````
lb4 controller
// User: Empty controller
````
Xem file hoàn thành: [user.controller.ts](https://github.com/NguyenVanKhoi2603/post-loopback4-jwt-example/blob/master/src/controllers/user.controller.ts)

> Thêm vào file sequence.ts: xem file hoàn thành: [sequence.ts](https://github.com/NguyenVanKhoi2603/post-loopback4-jwt-example/blob/master/src/sequence.ts)

> Thêm vào  application.ts: xem file hoàn thành [application.ts](https://github.com/NguyenVanKhoi2603/post-loopback4-jwt-example/blob/master/src/application.ts)

> Thêm func cho file user.repository.ts
````
// user.ropository.ts
async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredential | undefined> {
    try {
      return await this.userCredential(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
````

> yarn start.

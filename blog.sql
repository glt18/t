create database blog;
  use blog;
  create table article(
    id int not null auto_increment primary key,
    title char not null,
    reporttime char not null,
    type char not null,
    tags char not null,
    content text not null
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;
  create table comments(
    userid char not null,
    commenttime char not null,
    content text not null,
    commentsid char not null DEFAULT "gl_970204",
    articleid int not null,
    foreign key(articleid) references article(id) on delete cascade on update cascade
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;
  create table messages(
    userid char not null,
    messagetime char not null,
    content text not null
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;
  grant select, insert, update
    on blog.*
    to admit identified by '123456';
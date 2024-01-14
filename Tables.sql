create table Books
(
    BookId            int auto_increment
        primary key,
    Author            varchar(255) charset utf8mb3       not null,
    ISBN              varchar(13) charset utf8mb3        not null,
    Title             varchar(255) charset utf8mb3       not null,
    AvailableQuantity int                                not null,
    ShelfLocation     varchar(255) charset utf8mb3       null,
    CreatedAt         datetime default CURRENT_TIMESTAMP not null,
    UpdatedAt         datetime                           null on update CURRENT_TIMESTAMP,
    constraint Books_ISBN_uindex
        unique (ISBN),
    check (`AvailableQuantity` >= 0)
);

create table Borrowers
(
    BorrowerID     int auto_increment
        primary key,
    Name           varchar(255) charset utf8mb3       not null,
    Email          varchar(255) charset utf8mb3       not null,
    RegisteredDate datetime default CURRENT_TIMESTAMP not null,
    UpdatedAt      datetime default CURRENT_TIMESTAMP null,
    constraint Borrowers_Email_uindex
        unique (Email)
);

create table Borrow
(
    BorrowId   int auto_increment
        primary key,
    BorrowerId int                                not null,
    BookId     int                                not null,
    ReturnDate datetime                           null,
    DueDate    datetime                           null,
    CreatedAt  datetime default CURRENT_TIMESTAMP not null,
    UpdatedAt  datetime                           null on update CURRENT_TIMESTAMP,
    constraint Borrow_Books_BookId_fk
        foreign key (BookId) references Books (BookId),
    constraint Borrow_Borrowers_BorrowerID_fk
        foreign key (BorrowerId) references Borrowers (BorrowerID)
);

create index Borrow_BorrowerId_BookId_index
    on Borrow (BorrowerId, BookId);

create index Borrow_BorrowerId_ReturnDate_DueDate_index
    on Borrow (BorrowerId, ReturnDate, DueDate);

create index Borrow_BorrowerId_index
    on Borrow (BorrowerId);

create index Borrow_CreatedAt_index
    on Borrow (CreatedAt);

create index Borrow_DueDate_index
    on Borrow (DueDate);

create index Borrow_ReturnDate_DueDate_index
    on Borrow (ReturnDate, DueDate);

create index Borrow_ReturnDate_index
    on Borrow (ReturnDate);

CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "CategoryBook" (
    "categoryId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "CategoryBook_pkey" PRIMARY KEY ("categoryId","bookId")
);


CREATE TABLE "AuthorBook" (
    "authorId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "AuthorBook_pkey" PRIMARY KEY ("authorId","bookId")
);


CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");


ALTER TABLE "CategoryBook" ADD CONSTRAINT "CategoryBook_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


ALTER TABLE "CategoryBook" ADD CONSTRAINT "CategoryBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


ALTER TABLE "AuthorBook" ADD CONSTRAINT "AuthorBook_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


ALTER TABLE "AuthorBook" ADD CONSTRAINT "AuthorBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


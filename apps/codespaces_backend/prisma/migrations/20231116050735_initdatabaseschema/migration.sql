-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneno" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "country" TEXT,
    "DOB" TIMESTAMP(3),
    "profilePic" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phoneno_key" ON "user"("phoneno");

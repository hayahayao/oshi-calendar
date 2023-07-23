-- CreateTable
CREATE TABLE "Liver" (
    "id" SERIAL NOT NULL,
    "channelId" VARCHAR(24) NOT NULL,
    "slug" VARCHAR(20) NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "enName" VARCHAR(20) NOT NULL,
    "avatar" TEXT NOT NULL,
    "linkTwitter" TEXT NOT NULL,
    "linkYoutube" TEXT NOT NULL,
    "colorHighlight" VARCHAR(7) NOT NULL,
    "colorMain" VARCHAR(7) NOT NULL,

    CONSTRAINT "Liver_pkey" PRIMARY KEY ("id")
);

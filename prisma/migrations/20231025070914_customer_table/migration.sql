-- CreateTable
CREATE TABLE "Customer" (
    "_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "given_name" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "preferences" JSONB NOT NULL,
    "creation_source" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "address" JSONB,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "_Groups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Segments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Groups_AB_unique" ON "_Groups"("A", "B");

-- CreateIndex
CREATE INDEX "_Groups_B_index" ON "_Groups"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Segments_AB_unique" ON "_Segments"("A", "B");

-- CreateIndex
CREATE INDEX "_Segments_B_index" ON "_Segments"("B");

-- AddForeignKey
ALTER TABLE "_Groups" ADD CONSTRAINT "_Groups_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Groups" ADD CONSTRAINT "_Groups_B_fkey" FOREIGN KEY ("B") REFERENCES "CustomerGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Segments" ADD CONSTRAINT "_Segments_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Segments" ADD CONSTRAINT "_Segments_B_fkey" FOREIGN KEY ("B") REFERENCES "CustomerSegment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

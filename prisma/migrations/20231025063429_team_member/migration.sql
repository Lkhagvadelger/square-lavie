-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "reference_id" TEXT NOT NULL,
    "is_owner" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "given_name" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "assigned_locations" JSONB NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

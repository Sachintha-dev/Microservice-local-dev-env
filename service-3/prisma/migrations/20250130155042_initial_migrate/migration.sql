-- CreateTable
CREATE TABLE "caste" (
    "id" SERIAL NOT NULL,
    "si_enc" BYTEA,
    "ta_enc" BYTEA,
    "en_enc" BYTEA,
    "ethnicity_id" INTEGER,

    CONSTRAINT "caste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" SERIAL NOT NULL,
    "si_enc" BYTEA,
    "ta_enc" BYTEA,
    "en_enc" BYTEA,
    "country_id" INTEGER NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "civil_status" (
    "id" SERIAL NOT NULL,
    "si_enc" BYTEA,
    "ta_enc" BYTEA,
    "en_enc" BYTEA,

    CONSTRAINT "civil_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" SERIAL NOT NULL,
    "si_enc" BYTEA,
    "ta_enc" BYTEA,
    "en_enc" BYTEA,
    "phone_code_enc" BYTEA,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drinking" (
    "id" SERIAL NOT NULL,
    "si_enc" BYTEA,
    "ta_enc" BYTEA,
    "en_enc" BYTEA,

    CONSTRAINT "drinking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_level" (
    "id" SERIAL NOT NULL,
    "si_enc" BYTEA,
    "ta_enc" BYTEA,
    "en_enc" BYTEA,

    CONSTRAINT "edu_level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ethnicity" (
    "id" SERIAL NOT NULL,
    "si_enc" BYTEA,
    "ta_enc" BYTEA,
    "en_enc" BYTEA,

    CONSTRAINT "ethnicity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_preference" (
    "id" SERIAL NOT NULL,
    "si_enc" BYTEA,
    "ta_enc" BYTEA,
    "en_enc" BYTEA,

    CONSTRAINT "food_preference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hearts" (
    "id" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "free_hearts" INTEGER DEFAULT 5,
    "paid_hearts" INTEGER DEFAULT 0,

    CONSTRAINT "hearts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "height" (
    "id" SERIAL NOT NULL,
    "value_enc" BYTEA,

    CONSTRAINT "height_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horoscope_matching" (
    "id" SERIAL NOT NULL,
    "si_enc" BYTEA,
    "ta_enc" BYTEA,
    "en_enc" BYTEA,

    CONSTRAINT "horoscope_matching_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interests_list" (
    "id" SERIAL NOT NULL,
    "si_enc" BYTEA,
    "ta_enc" BYTEA,
    "en_enc" BYTEA,

    CONSTRAINT "interests_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" SERIAL NOT NULL,
    "si_enc" BYTEA,
    "ta_enc" BYTEA,
    "en_enc" BYTEA,
    "amount" DECIMAL(10,2) NOT NULL,
    "no_of_hearts" INTEGER NOT NULL,
    "status" VARCHAR(50),

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner_profile" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "min_age" INTEGER,
    "max_age" INTEGER,
    "gender_enc" BYTEA,
    "ethnicity_id" INTEGER,
    "religion_id" INTEGER,
    "edu_level_id" INTEGER,
    "nic_verified" BOOLEAN DEFAULT false,
    "caste_id" INTEGER,
    "civil_status_id" INTEGER,
    "height_id" INTEGER,
    "food_preference_id" INTEGER,
    "drinking_id" INTEGER,
    "smoking_id" INTEGER,
    "horoscope_matching_id" INTEGER,

    CONSTRAINT "partner_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profession" (
    "id" SERIAL NOT NULL,
    "si_enc" BYTEA,
    "ta_enc" BYTEA,
    "en_enc" BYTEA,

    CONSTRAINT "profession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "religion" (
    "id" SERIAL NOT NULL,
    "si_enc" BYTEA,
    "ta_enc" BYTEA,
    "en_enc" BYTEA,

    CONSTRAINT "religion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_users" (
    "id" SERIAL NOT NULL,
    "report_user_id" BIGINT NOT NULL,
    "reporter_id" BIGINT NOT NULL,
    "reason_enc" BYTEA,

    CONSTRAINT "report_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "sid" VARCHAR NOT NULL,
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "smoking" (
    "id" SERIAL NOT NULL,
    "si_enc" BYTEA,
    "ta_enc" BYTEA,
    "en_enc" BYTEA,

    CONSTRAINT "smoking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "package_id" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "no_of_hearts" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" BIGSERIAL NOT NULL,
    "first_name_enc" BYTEA,
    "dob_enc" BYTEA,
    "gender_enc" BYTEA,
    "ethnicity_id" INTEGER,
    "religion_id" INTEGER,
    "edu_level_id" INTEGER,
    "country_id" INTEGER,
    "city_id" INTEGER,
    "caste_id" INTEGER,
    "civil_status_id" INTEGER,
    "profession_id" INTEGER,
    "height_id" INTEGER,
    "food_preference_id" INTEGER,
    "drinking_id" INTEGER,
    "smoking_id" INTEGER,
    "horoscope_matching_id" INTEGER,
    "male_siblings" INTEGER DEFAULT 0,
    "female_siblings" INTEGER DEFAULT 0,
    "nic_enc" BYTEA,
    "bio_enc" BYTEA,
    "status" VARCHAR(50),
    "nic_verified" BOOLEAN DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_interests" (
    "id" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "interest_id" INTEGER NOT NULL,

    CONSTRAINT "user_interests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_requests" (
    "id" SERIAL NOT NULL,
    "sender_id" BIGINT NOT NULL,
    "receiver_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" BYTEA,
    "dob" DATE,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IDX_session_expire" ON "session"("expire");

-- AddForeignKey
ALTER TABLE "caste" ADD CONSTRAINT "caste_ethnicity_id_fkey" FOREIGN KEY ("ethnicity_id") REFERENCES "ethnicity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hearts" ADD CONSTRAINT "hearts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partner_profile" ADD CONSTRAINT "partner_profile_caste_id_fkey" FOREIGN KEY ("caste_id") REFERENCES "caste"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partner_profile" ADD CONSTRAINT "partner_profile_civil_status_id_fkey" FOREIGN KEY ("civil_status_id") REFERENCES "civil_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partner_profile" ADD CONSTRAINT "partner_profile_drinking_id_fkey" FOREIGN KEY ("drinking_id") REFERENCES "drinking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partner_profile" ADD CONSTRAINT "partner_profile_edu_level_id_fkey" FOREIGN KEY ("edu_level_id") REFERENCES "edu_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partner_profile" ADD CONSTRAINT "partner_profile_ethnicity_id_fkey" FOREIGN KEY ("ethnicity_id") REFERENCES "ethnicity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partner_profile" ADD CONSTRAINT "partner_profile_food_preference_id_fkey" FOREIGN KEY ("food_preference_id") REFERENCES "food_preference"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partner_profile" ADD CONSTRAINT "partner_profile_height_id_fkey" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partner_profile" ADD CONSTRAINT "partner_profile_horoscope_matching_id_fkey" FOREIGN KEY ("horoscope_matching_id") REFERENCES "horoscope_matching"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partner_profile" ADD CONSTRAINT "partner_profile_religion_id_fkey" FOREIGN KEY ("religion_id") REFERENCES "religion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partner_profile" ADD CONSTRAINT "partner_profile_smoking_id_fkey" FOREIGN KEY ("smoking_id") REFERENCES "smoking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partner_profile" ADD CONSTRAINT "partner_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report_users" ADD CONSTRAINT "report_users_report_user_id_fkey" FOREIGN KEY ("report_user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report_users" ADD CONSTRAINT "report_users_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_caste_id_fkey" FOREIGN KEY ("caste_id") REFERENCES "caste"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_civil_status_id_fkey" FOREIGN KEY ("civil_status_id") REFERENCES "civil_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_drinking_id_fkey" FOREIGN KEY ("drinking_id") REFERENCES "drinking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_edu_level_id_fkey" FOREIGN KEY ("edu_level_id") REFERENCES "edu_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_ethnicity_id_fkey" FOREIGN KEY ("ethnicity_id") REFERENCES "ethnicity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_food_preference_id_fkey" FOREIGN KEY ("food_preference_id") REFERENCES "food_preference"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_height_id_fkey" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_horoscope_matching_id_fkey" FOREIGN KEY ("horoscope_matching_id") REFERENCES "horoscope_matching"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_profession_id_fkey" FOREIGN KEY ("profession_id") REFERENCES "profession"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_religion_id_fkey" FOREIGN KEY ("religion_id") REFERENCES "religion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_smoking_id_fkey" FOREIGN KEY ("smoking_id") REFERENCES "smoking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_interests" ADD CONSTRAINT "user_interests_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "interests_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_interests" ADD CONSTRAINT "user_interests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_requests" ADD CONSTRAINT "user_requests_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_requests" ADD CONSTRAINT "user_requests_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

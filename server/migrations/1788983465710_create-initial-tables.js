/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.sql(`
        -- Cerate the contact table
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        CREATE TABLE contact(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(255) NOT NULL,
        message VARCHAR(255),
        appointment_date DATE NOT NULL,
        appointment_time TIME NOT NULL,
        UNIQUE(appointment_date, appointment_time),
        created_at TIMESTAMP DEFAULT now()
        );

        -- create the first timer table
        CREATE TYPE sex_type as ENUM('male', 'female');
        CREATE TYPE how_to_reach_out AS ENUM('phone call', 'whatsapp', 'email', 'home visit');
        CREATE TYPE joining_church AS ENUM('yes', 'no', 'maybe');

        CREATE TABLE first_timer(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(15) NOT NULL,
        address VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        followed_up BOOLEAN DEFAULT FALSE NOT NULL,
        reached_out how_to_reach_out NOT NULL,
        registered_at TIMESTAMP DEFAULT now(),
        sex sex_type NOT NULL,
        joining_church joining_church NOT NULL,
        prayer_request VARCHAR(255) 
        );

        -- create event table
        CREATE TABLE events(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        flyer TEXT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        start_date DATE NOT NULL,
        end_date DATE,
        CHECK(end_date IS NULL or end_date >= start_date),
        event_time TIME,
        venue VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT now()
        );

        -- create sermon table 
        CREATE TABLE sermon(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        video_url TEXT,
        audio_url TEXT NOT NULL,
        cover_art TEXT NOT NULL,
        title VARCHAR(225) NOT NULL,
        description TEXT,
        preacher VARCHAR(255) NOT NULL,
        preached_at DATE NOT NULL,
        created_at TIMESTAMP DEFAULT now()
        );

        -- create partnership table 
        CREATE TYPE frequency AS ENUM('daily', 'weekly', 'bi-weekly', 'monthly', 'yearly');
        CREATE TABLE partnership(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        frequency frequency NOT NULL,
        amount NUMERIC(12, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT now()
        );

        -- create payment table
        CREATE TYPE payment_type AS ENUM('card', 'transfer', 'ussd');
        CREATE TYPE payment_status_type AS ENUM('processing', 'pending', 'successful', 'failed', 'refunded', 'reversed');

        CREATE TABLE payments(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        partnership_id UUID REFERENCES partnership(id) ON DELETE SET NULL,
        payment_type payment_type NOT NULL,
        payment_status payment_status_type NOT  NULL,
        amount NUMERIC(12,2) NOT NULL,
        paid_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT now()
        );
        `)
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`
        -- drop child tables first
        DROP TABLE IF EXISTS payments;

        -- drop independent tables
        DROP TABLE IF EXISTS partnership;
        DROP TABLE IF EXISTS sermon;
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS first_timer;
        DROP TABLE IF EXISTS contact;

        -- drop custom data types 
        DROP TYPE IF EXISTS sex_type;
        DROP TYPE IF EXISTS how_to_reach_out;
        DROP TYPE IF EXISTS joining_church;
        DROP TYPE IF EXISTS frequency;
        DROP TYPE IF EXISTS payment_type;
        DROP TYPE IF EXISTS payment_status_type;
        `)
};

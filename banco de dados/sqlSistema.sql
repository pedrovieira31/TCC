

-- Table: public.atividades

-- DROP TABLE public.atividades;

CREATE TABLE public.atividades
(
    codigo character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "horasTotais" integer NOT NULL,
    CONSTRAINT atividades_pkey PRIMARY KEY (codigo)
)

TABLESPACE pg_default;

ALTER TABLE public.atividades
    OWNER to postgres;


-- Table: public.usuarios

-- DROP TABLE public.usuarios;

CREATE TABLE public.usuarios
(
    matricula character varying(255) COLLATE pg_catalog."default" NOT NULL,
    nome character varying(255) COLLATE pg_catalog."default" NOT NULL,
    senha character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    admin boolean NOT NULL DEFAULT false,
    CONSTRAINT usuarios_pkey PRIMARY KEY (matricula),
    CONSTRAINT usuarios_email_unique UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE public.usuarios
    OWNER to postgres;


-- Table: public.processos

-- DROP TABLE public.processos;

CREATE TABLE public.processos
(
    p_id serial NOT NULL,
    atividade character varying COLLATE pg_catalog."default",
    matricula character varying COLLATE pg_catalog."default",
    descricao character varying COLLATE pg_catalog."default",
    horas real,
    certificado character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Processo_pkey" PRIMARY KEY (p_id),
    CONSTRAINT "Atividades_pkey" FOREIGN KEY (atividade)
        REFERENCES public.atividades (codigo) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "Usuário_pkey" FOREIGN KEY (matricula)
        REFERENCES public.usuarios (matricula) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.processos
    OWNER to postgres;

-- Table: public.knex_migrations

-- DROP TABLE public.knex_migrations;

CREATE TABLE public.knex_migrations
(
    id serial NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    batch integer,
    migration_time timestamp with time zone,
    CONSTRAINT knex_migrations_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.knex_migrations
    OWNER to postgres;

-- Table: public.knex_migrations_lock

-- DROP TABLE public.knex_migrations_lock;

CREATE TABLE public.knex_migrations_lock
(
    index serial NOT NULL,
    is_locked integer,
    CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index)
)

TABLESPACE pg_default;

ALTER TABLE public.knex_migrations_lock
    OWNER to postgres;
	
INSERT INTO atividades VALUES('AE001', 90);
INSERT INTO atividades VALUES('AE002', 90);
INSERT INTO atividades VALUES('AE003', 90);
INSERT INTO atividades VALUES('AE004', 60);
INSERT INTO atividades VALUES('AE005', 45);
INSERT INTO atividades VALUES('AE006', 90);
INSERT INTO atividades VALUES('AE007', 60);
INSERT INTO atividades VALUES('AE008', 90);
INSERT INTO atividades VALUES('AE009', 60);
INSERT INTO atividades VALUES('AE010', 90);
INSERT INTO atividades VALUES('AE011', 90);
INSERT INTO atividades VALUES('AE012', 30);
INSERT INTO atividades VALUES('AE013', 90);
INSERT INTO atividades VALUES('AE014', 90)
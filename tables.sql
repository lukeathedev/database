-- Lista de supermercados
-- TODO: field de endereço?
CREATE TABLE IF NOT EXISTS public.supermarkets
(
    id   integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    uid  character varying(8) NOT NULL,
    Name character varying,

    PRIMARY KEY (id),
    UNIQUE (uid)
);
COPY public.supermarkets FROM '/default/supermarkets.csv' csv header;
SELECT setval('supermarkets_id_seq', (SELECT max(id) FROM public.supermarkets));

-- Lista de produtos
CREATE TABLE public.products
(
    id         integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    uid        character varying(8) NOT NULL,
    "Name"     character varying,
    "Quantity" character varying,

    PRIMARY KEY (id),
    UNIQUE (uid)
);
COPY public.products FROM '/default/products.csv' csv header;
SELECT setval('products_id_seq', (SELECT max(id) FROM public.products));

-- Time series
CREATE TABLE public.timeseries
(
    id              integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    "Date"          date NOT NULL,
    supermarket_uid character varying(8) NOT NULL,
    product_uid     character varying(8) NOT NULL,
    "Price"         real NOT NULL,
    
    FOREIGN KEY (supermarket_uid)
    REFERENCES public.supermarkets(uid),
    
    FOREIGN KEY (product_uid)
    REFERENCES public.products(uid),
    
    PRIMARY KEY (id)
);
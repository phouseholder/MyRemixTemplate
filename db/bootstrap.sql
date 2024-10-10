CREATE TABLE IF NOT EXISTS public."user" (
	username text NOT NULL,
	display_name text NULL,
	"role" text NULL,
	"password" text NULL,
	CONSTRAINT user_pk PRIMARY KEY (username)
);

INSERT INTO public."user" (username, display_name, "role", password)
VALUES ('admin', 'Adam Inn', 'admin', '72177f3cc902f7b7296c1f17d6724550:d86edf8e0e817cc1e1adf8669ed4b78eda8a67f950de120599c923d29d138498a7f41474320126bc75d7b4eb0a42ed376d56ea9a018450e550adf108644cb911')
ON CONFLICT (username) DO NOTHING;


CREATE TABLE IF NOT EXISTS public.customer (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NULL,
	email text NULL,
	phone text NULL,
	added_by text NOT NULL,
	added_on timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT customer_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.product (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NULL,
	price numeric NULL,
	added_by text NOT NULL,
	added_on timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT product_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."order" (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	ship_date date NULL,
	customer_id uuid NULL,
	added_by text NOT NULL,
	added_on timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT order_pk PRIMARY KEY (id),
	CONSTRAINT order_customer_fk FOREIGN KEY (customer_id) REFERENCES public.customer(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.order_item (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	order_id uuid NOT NULL,
	product_id uuid NOT NULL,
	quantity int4 NULL,
	added_by text NOT NULL,
	added_on timestamptz DEFAULT now() NOT NULL,
	CONSTRAINT order_item_pk PRIMARY KEY (id),
	CONSTRAINT order_item_order_fk FOREIGN KEY (order_id) REFERENCES public."order"(id) ON DELETE CASCADE,
	CONSTRAINT order_item_product_fk FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE RESTRICT
);

-- Inserting 5 customers
INSERT INTO public.customer (id, "name", email, phone, added_by) VALUES
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'Customer 1', 'customer1@example.com', '123-456-7890', 'admin'),
('7c9e6679-7425-40de-944b-e07fc1f90ae7', 'Customer 2', 'customer2@example.com', '234-567-8901', 'admin'),
('4a2fc9e7-86d5-4311-9dbf-f5ef44e48577', 'Customer 3', 'customer3@example.com', '345-678-9012', 'admin'),
('3c9d8f4e-92a2-497e-a4d5-0a8a9d6f83bb', 'Customer 4', 'customer4@example.com', '456-789-0123', 'admin'),
('d45ef6b7-7e65-4b9f-85ec-cfa1947a4d7f', 'Customer 5', 'customer5@example.com', '567-890-1234', 'admin')
ON CONFLICT DO NOTHING;

-- Inserting 10 products
INSERT INTO public.product (id, "name", price, added_by) VALUES
('a4b6c8d0-0d7e-4a8a-8e75-0c1b0e1b8e30', 'Product 1', 10.00, 'admin'),
('c1e8f8a4-0b56-4d8a-8c57-0e9f1c0b6e8d', 'Product 2', 20.00, 'admin'),
('d9e2f6b7-7c65-4b8e-8c75-0c1b1e0b8e7d', 'Product 3', 30.00, 'admin'),
('e4f7b8c0-0e7f-4a9a-9e76-0d1b2e1c9e30', 'Product 4', 40.00, 'admin'),
('f1a2d3c4-1a34-4b7a-7e35-0c1b3e0c8e7d', 'Product 5', 50.00, 'admin'),
('a5b6c7d0-0c7e-4a8b-8e85-0c1b4e1b8e30', 'Product 6', 60.00, 'admin'),
('b3e8f9a4-0b47-4d8b-8c67-0e9f2c0b6e8d', 'Product 7', 70.00, 'admin'),
('c9e3f7b7-7d65-4b8f-8c85-0c1b5e1b8e7d', 'Product 8', 80.00, 'admin'),
('d5f6b9c0-0f7f-4a9b-9e86-0d1b6e1c9e30', 'Product 9', 90.00, 'admin'),
('e2a3d4c4-1b34-4b7b-7e45-0c1b7e0c8e7d', 'Product 10', 100.00, 'admin')
ON CONFLICT DO NOTHING;

-- Inserting 15 orders with valid UUIDs
INSERT INTO public."order" (id, ship_date, customer_id, added_by) VALUES
('e73a5a6c-8f8d-4a10-ae54-abbf2b9f76d7', '2024-06-20', 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'admin'),
('b4a2c5d2-0b1e-4c80-89ef-19b5f7e2fdd7', '2024-06-21', '7c9e6679-7425-40de-944b-e07fc1f90ae7', 'admin'),
('1ab4e3c1-1ab7-4e5c-9a8f-9b8d5e6f79d7', '2024-06-22', '4a2fc9e7-86d5-4311-9dbf-f5ef44e48577', 'admin'),
('5e6b7c8d-9b8e-4a5b-a6c1-e2f3b4d1f7a7', '2024-06-23', '3c9d8f4e-92a2-497e-a4d5-0a8a9d6f83bb', 'admin'),
('f6c2e3a1-8b7e-4d5b-a5c3-e1f2d4a5f8a7', '2024-06-24', 'd45ef6b7-7e65-4b9f-85ec-cfa1947a4d7f', 'admin'),
('4b5c6d7e-1a2b-4c8d-9f6a-c5b6d7e8f9a7', '2024-06-25', 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'admin'),
('c7d8e9f1-2a3b-4c8d-8e9f-d1a2b3c4f8a7', '2024-06-26', '7c9e6679-7425-40de-944b-e07fc1f90ae7', 'admin'),
('9f8a7b6c-3a4b-5c9d-7e8f-f1e2d3c4b7a7', '2024-06-27', '4a2fc9e7-86d5-4311-9dbf-f5ef44e48577', 'admin'),
('2c3d4e5f-4a5b-6d7e-8f9a-e1f2d3c4a5b7', '2024-06-28', '3c9d8f4e-92a2-497e-a4d5-0a8a9d6f83bb', 'admin'),
('8b9c0d1e-5a6b-7e8f-9f0a-d1e2f3a4b6c7', '2024-06-29', 'd45ef6b7-7e65-4b9f-85ec-cfa1947a4d7f', 'admin'),
('3d4e5f6a-6a7b-8e9f-0f1a-c1d2e3b4a6f7', '2024-06-30', 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'admin'),
('4e5f6a7b-7b8e-9f0a-1f2a-b1c2d3a4e6f7', '2024-07-01', '7c9e6679-7425-40de-944b-e07fc1f90ae7', 'admin'),
('5f6a7b8c-8c9d-0a1b-2b3a-c1d2e3a4b5f7', '2024-07-02', '4a2fc9e7-86d5-4311-9dbf-f5ef44e48577', 'admin'),
('6a7b8c9d-9d0a-1b2c-3c4a-d1e2f3a4b6f7', '2024-07-03', '3c9d8f4e-92a2-497e-a4d5-0a8a9d6f83bb', 'admin'),
('7b8c9d0a-0a1b-2c3d-4d5a-e1f2d3a4b7c7', '2024-07-04', 'd45ef6b7-7e65-4b9f-85ec-cfa1947a4d7f', 'admin')
ON CONFLICT DO NOTHING;


INSERT INTO public.order_item (id, order_id, product_id, quantity, added_by) VALUES
('e0a1b2c3-4d5e-6f7a-8b9c-0d1e2f3a4b5c', 'e73a5a6c-8f8d-4a10-ae54-abbf2b9f76d7', 'a4b6c8d0-0d7e-4a8a-8e75-0c1b0e1b8e30', 2, 'admin'),
('f1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'b4a2c5d2-0b1e-4c80-89ef-19b5f7e2fdd7', 'a4b6c8d0-0d7e-4a8a-8e75-0c1b0e1b8e30', 1, 'admin'),
('a2b3c4d5-6e7f-8a9b-0c1d-2e3f4a5b6c7d', '1ab4e3c1-1ab7-4e5c-9a8f-9b8d5e6f79d7', 'a4b6c8d0-0d7e-4a8a-8e75-0c1b0e1b8e30', 3, 'admin'),
('b3c4d5e6-7f8a-9b0c-1d2e-3f4a5b6c7d8e', '5e6b7c8d-9b8e-4a5b-a6c1-e2f3b4d1f7a7', 'a4b6c8d0-0d7e-4a8a-8e75-0c1b0e1b8e30', 5, 'admin'),
('c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f', 'f6c2e3a1-8b7e-4d5b-a5c3-e1f2d4a5f8a7', 'a4b6c8d0-0d7e-4a8a-8e75-0c1b0e1b8e30', 4, 'admin'),
('d5e6f7a8-9b0c-1d2e-3f4a-5b6c7d8e9f0a', '4b5c6d7e-1a2b-4c8d-9f6a-c5b6d7e8f9a7', 'a5b6c7d0-0c7e-4a8b-8e85-0c1b4e1b8e30', 1, 'admin'),
('e6f7a8b9-0c1d-2e3f-4a5b-6c7d8e9f0b1c', 'c7d8e9f1-2a3b-4c8d-8e9f-d1a2b3c4f8a7', 'b3e8f9a4-0b47-4d8b-8c67-0e9f2c0b6e8d', 2, 'admin'),
('f7a8b9c0-1d2e-3f4a-5b6c-7d8e9f0b1c2d', '9f8a7b6c-3a4b-5c9d-7e8f-f1e2d3c4b7a7', 'c9e3f7b7-7d65-4b8f-8c85-0c1b5e1b8e7d', 3, 'admin'),
('a8b9c0d1-2e3f-4a5b-6c7d-8e9f0b1c2d3e', '2c3d4e5f-4a5b-6d7e-8f9a-e1f2d3c4a5b7', 'd5f6b9c0-0f7f-4a9b-9e86-0d1b6e1c9e30', 4, 'admin'),
('b9c0d1e2-3f4a-5b6c-7d8e-9f0b1c2d3e4f', '8b9c0d1e-5a6b-7e8f-9f0a-d1e2f3a4b6c7', 'e2a3d4c4-1b34-4b7b-7e45-0c1b7e0c8e7d', 5, 'admin')
ON CONFLICT DO NOTHING;
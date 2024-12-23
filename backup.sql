PGDMP  :    
            	    |            brandanbites_db    16.3    16.3 C    "           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            #           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            $           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            %           1262    16389    brandanbites_db    DATABASE     z   CREATE DATABASE brandanbites_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'es_AR.utf8';
    DROP DATABASE brandanbites_db;
                postgres    false            &           0    0    DATABASE brandanbites_db    ACL     b   GRANT ALL ON DATABASE brandanbites_db TO tiago;
GRANT ALL ON DATABASE brandanbites_db TO santino;
                   postgres    false    4133            �            1259    16404    carritos    TABLE     {  CREATE TABLE public.carritos (
    id_carrito integer NOT NULL,
    id_usuario integer,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    estado character varying(20),
    CONSTRAINT carritos_estado_check CHECK (((estado)::text = ANY ((ARRAY['activo'::character varying, 'finalizado'::character varying, 'cancelado'::character varying])::text[])))
);
    DROP TABLE public.carritos;
       public         heap    tiago    false            �            1259    16403    carritos_id_carrito_seq    SEQUENCE     �   CREATE SEQUENCE public.carritos_id_carrito_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.carritos_id_carrito_seq;
       public          tiago    false    218            '           0    0    carritos_id_carrito_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.carritos_id_carrito_seq OWNED BY public.carritos.id_carrito;
          public          tiago    false    217            �            1259    16432 
   categorias    TABLE     r   CREATE TABLE public.categorias (
    id_categoria integer NOT NULL,
    nombre character varying(100) NOT NULL
);
    DROP TABLE public.categorias;
       public         heap    tiago    false            �            1259    16431    categorias_id_categoria_seq    SEQUENCE     �   CREATE SEQUENCE public.categorias_id_categoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.categorias_id_categoria_seq;
       public          tiago    false    220            (           0    0    categorias_id_categoria_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.categorias_id_categoria_seq OWNED BY public.categorias.id_categoria;
          public          tiago    false    219            �            1259    16454    detalle_carrito    TABLE     l  CREATE TABLE public.detalle_carrito (
    id_detalle integer NOT NULL,
    id_carrito integer,
    id_producto integer,
    cantidad integer NOT NULL,
    precio_unitario numeric(10,2) NOT NULL,
    subtotal numeric(10,2) GENERATED ALWAYS AS (((cantidad)::numeric * precio_unitario)) STORED,
    CONSTRAINT detalle_carrito_cantidad_check CHECK ((cantidad > 0))
);
 #   DROP TABLE public.detalle_carrito;
       public         heap    tiago    false            �            1259    16453    detalle_carrito_id_detalle_seq    SEQUENCE     �   CREATE SEQUENCE public.detalle_carrito_id_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.detalle_carrito_id_detalle_seq;
       public          tiago    false    224            )           0    0    detalle_carrito_id_detalle_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.detalle_carrito_id_detalle_seq OWNED BY public.detalle_carrito.id_detalle;
          public          tiago    false    223            �            1259    16502    historial_transacciones    TABLE     E  CREATE TABLE public.historial_transacciones (
    id_transaccion integer NOT NULL,
    id_usuario integer,
    id_carrito integer,
    monto_total numeric(10,2) NOT NULL,
    fecha_compra timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    metodo_pago character varying(50) DEFAULT 'MercadoPago'::character varying
);
 +   DROP TABLE public.historial_transacciones;
       public         heap    tiago    false            �            1259    16501 *   historial_transacciones_id_transaccion_seq    SEQUENCE     �   CREATE SEQUENCE public.historial_transacciones_id_transaccion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 A   DROP SEQUENCE public.historial_transacciones_id_transaccion_seq;
       public          tiago    false    229            *           0    0 *   historial_transacciones_id_transaccion_seq    SEQUENCE OWNED BY     y   ALTER SEQUENCE public.historial_transacciones_id_transaccion_seq OWNED BY public.historial_transacciones.id_transaccion;
          public          tiago    false    228            �            1259    16473    pagos    TABLE       CREATE TABLE public.pagos (
    id_pago integer NOT NULL,
    id_carrito integer,
    monto_total numeric(10,2) NOT NULL,
    metodo_pago character varying(50) DEFAULT 'MercadoPago'::character varying,
    fecha_pago timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.pagos;
       public         heap    tiago    false            �            1259    16472    pagos_id_pago_seq    SEQUENCE     �   CREATE SEQUENCE public.pagos_id_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.pagos_id_pago_seq;
       public          tiago    false    226            +           0    0    pagos_id_pago_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.pagos_id_pago_seq OWNED BY public.pagos.id_pago;
          public          tiago    false    225            �            1259    16486    producto_categoria    TABLE     p   CREATE TABLE public.producto_categoria (
    id_producto integer NOT NULL,
    id_categoria integer NOT NULL
);
 &   DROP TABLE public.producto_categoria;
       public         heap    tiago    false            �            1259    16439 	   productos    TABLE     D  CREATE TABLE public.productos (
    id_producto integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL,
    cantidad_disponible integer NOT NULL,
    id_categoria integer,
    CONSTRAINT productos_cantidad_disponible_check CHECK ((cantidad_disponible >= 0))
);
    DROP TABLE public.productos;
       public         heap    tiago    false            �            1259    16438    productos_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.productos_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.productos_id_producto_seq;
       public          tiago    false    222            ,           0    0    productos_id_producto_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.productos_id_producto_seq OWNED BY public.productos.id_producto;
          public          tiago    false    221            �            1259    16393    usuarios    TABLE     �  CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    "contraseña" character varying(255) NOT NULL,
    telefono character varying(15),
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_ultimo_acceso timestamp without time zone,
    CONSTRAINT usuarios_email_check CHECK (((email)::text ~~ '%@insi.edu.ar'::text))
);
    DROP TABLE public.usuarios;
       public         heap    tiago    false            �            1259    16392    usuarios_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.usuarios_id_usuario_seq;
       public          tiago    false    216            -           0    0    usuarios_id_usuario_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;
          public          tiago    false    215            W           2604    16407    carritos id_carrito    DEFAULT     z   ALTER TABLE ONLY public.carritos ALTER COLUMN id_carrito SET DEFAULT nextval('public.carritos_id_carrito_seq'::regclass);
 B   ALTER TABLE public.carritos ALTER COLUMN id_carrito DROP DEFAULT;
       public          tiago    false    217    218    218            Y           2604    16435    categorias id_categoria    DEFAULT     �   ALTER TABLE ONLY public.categorias ALTER COLUMN id_categoria SET DEFAULT nextval('public.categorias_id_categoria_seq'::regclass);
 F   ALTER TABLE public.categorias ALTER COLUMN id_categoria DROP DEFAULT;
       public          tiago    false    219    220    220            [           2604    16457    detalle_carrito id_detalle    DEFAULT     �   ALTER TABLE ONLY public.detalle_carrito ALTER COLUMN id_detalle SET DEFAULT nextval('public.detalle_carrito_id_detalle_seq'::regclass);
 I   ALTER TABLE public.detalle_carrito ALTER COLUMN id_detalle DROP DEFAULT;
       public          tiago    false    223    224    224            `           2604    16505 &   historial_transacciones id_transaccion    DEFAULT     �   ALTER TABLE ONLY public.historial_transacciones ALTER COLUMN id_transaccion SET DEFAULT nextval('public.historial_transacciones_id_transaccion_seq'::regclass);
 U   ALTER TABLE public.historial_transacciones ALTER COLUMN id_transaccion DROP DEFAULT;
       public          tiago    false    228    229    229            ]           2604    16476    pagos id_pago    DEFAULT     n   ALTER TABLE ONLY public.pagos ALTER COLUMN id_pago SET DEFAULT nextval('public.pagos_id_pago_seq'::regclass);
 <   ALTER TABLE public.pagos ALTER COLUMN id_pago DROP DEFAULT;
       public          tiago    false    226    225    226            Z           2604    16442    productos id_producto    DEFAULT     ~   ALTER TABLE ONLY public.productos ALTER COLUMN id_producto SET DEFAULT nextval('public.productos_id_producto_seq'::regclass);
 D   ALTER TABLE public.productos ALTER COLUMN id_producto DROP DEFAULT;
       public          tiago    false    222    221    222            U           2604    16396    usuarios id_usuario    DEFAULT     z   ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);
 B   ALTER TABLE public.usuarios ALTER COLUMN id_usuario DROP DEFAULT;
       public          tiago    false    216    215    216                      0    16404    carritos 
   TABLE DATA           R   COPY public.carritos (id_carrito, id_usuario, fecha_creacion, estado) FROM stdin;
    public          tiago    false    218   @V                 0    16432 
   categorias 
   TABLE DATA           :   COPY public.categorias (id_categoria, nombre) FROM stdin;
    public          tiago    false    220   ]V                 0    16454    detalle_carrito 
   TABLE DATA           i   COPY public.detalle_carrito (id_detalle, id_carrito, id_producto, cantidad, precio_unitario) FROM stdin;
    public          tiago    false    224   zV                 0    16502    historial_transacciones 
   TABLE DATA           �   COPY public.historial_transacciones (id_transaccion, id_usuario, id_carrito, monto_total, fecha_compra, metodo_pago) FROM stdin;
    public          tiago    false    229   �V                 0    16473    pagos 
   TABLE DATA           Z   COPY public.pagos (id_pago, id_carrito, monto_total, metodo_pago, fecha_pago) FROM stdin;
    public          tiago    false    226   �V                 0    16486    producto_categoria 
   TABLE DATA           G   COPY public.producto_categoria (id_producto, id_categoria) FROM stdin;
    public          tiago    false    227   �V                 0    16439 	   productos 
   TABLE DATA           p   COPY public.productos (id_producto, nombre, descripcion, precio, cantidad_disponible, id_categoria) FROM stdin;
    public          tiago    false    222   �V                 0    16393    usuarios 
   TABLE DATA           {   COPY public.usuarios (id_usuario, nombre, email, "contraseña", telefono, fecha_creacion, fecha_ultimo_acceso) FROM stdin;
    public          tiago    false    216   W       .           0    0    carritos_id_carrito_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.carritos_id_carrito_seq', 1, false);
          public          tiago    false    217            /           0    0    categorias_id_categoria_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.categorias_id_categoria_seq', 1, false);
          public          tiago    false    219            0           0    0    detalle_carrito_id_detalle_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.detalle_carrito_id_detalle_seq', 1, false);
          public          tiago    false    223            1           0    0 *   historial_transacciones_id_transaccion_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('public.historial_transacciones_id_transaccion_seq', 1, false);
          public          tiago    false    228            2           0    0    pagos_id_pago_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.pagos_id_pago_seq', 1, false);
          public          tiago    false    225            3           0    0    productos_id_producto_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.productos_id_producto_seq', 1, false);
          public          tiago    false    221            4           0    0    usuarios_id_usuario_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 1, false);
          public          tiago    false    215            l           2606    16411    carritos carritos_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.carritos
    ADD CONSTRAINT carritos_pkey PRIMARY KEY (id_carrito);
 @   ALTER TABLE ONLY public.carritos DROP CONSTRAINT carritos_pkey;
       public            tiago    false    218            n           2606    16437    categorias categorias_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id_categoria);
 D   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_pkey;
       public            tiago    false    220            r           2606    16461 $   detalle_carrito detalle_carrito_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.detalle_carrito
    ADD CONSTRAINT detalle_carrito_pkey PRIMARY KEY (id_detalle);
 N   ALTER TABLE ONLY public.detalle_carrito DROP CONSTRAINT detalle_carrito_pkey;
       public            tiago    false    224            x           2606    16509 4   historial_transacciones historial_transacciones_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.historial_transacciones
    ADD CONSTRAINT historial_transacciones_pkey PRIMARY KEY (id_transaccion);
 ^   ALTER TABLE ONLY public.historial_transacciones DROP CONSTRAINT historial_transacciones_pkey;
       public            tiago    false    229            t           2606    16480    pagos pagos_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_pkey PRIMARY KEY (id_pago);
 :   ALTER TABLE ONLY public.pagos DROP CONSTRAINT pagos_pkey;
       public            tiago    false    226            v           2606    16490 *   producto_categoria producto_categoria_pkey 
   CONSTRAINT        ALTER TABLE ONLY public.producto_categoria
    ADD CONSTRAINT producto_categoria_pkey PRIMARY KEY (id_producto, id_categoria);
 T   ALTER TABLE ONLY public.producto_categoria DROP CONSTRAINT producto_categoria_pkey;
       public            tiago    false    227    227            p           2606    16447    productos productos_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id_producto);
 B   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_pkey;
       public            tiago    false    222            h           2606    16402    usuarios usuarios_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_email_key;
       public            tiago    false    216            j           2606    16400    usuarios usuarios_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            tiago    false    216            y           2606    16412 !   carritos carritos_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.carritos
    ADD CONSTRAINT carritos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);
 K   ALTER TABLE ONLY public.carritos DROP CONSTRAINT carritos_id_usuario_fkey;
       public          tiago    false    218    216    3946            {           2606    16462 /   detalle_carrito detalle_carrito_id_carrito_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_carrito
    ADD CONSTRAINT detalle_carrito_id_carrito_fkey FOREIGN KEY (id_carrito) REFERENCES public.carritos(id_carrito);
 Y   ALTER TABLE ONLY public.detalle_carrito DROP CONSTRAINT detalle_carrito_id_carrito_fkey;
       public          tiago    false    224    218    3948            |           2606    16467 0   detalle_carrito detalle_carrito_id_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_carrito
    ADD CONSTRAINT detalle_carrito_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);
 Z   ALTER TABLE ONLY public.detalle_carrito DROP CONSTRAINT detalle_carrito_id_producto_fkey;
       public          tiago    false    224    222    3952            �           2606    16515 ?   historial_transacciones historial_transacciones_id_carrito_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.historial_transacciones
    ADD CONSTRAINT historial_transacciones_id_carrito_fkey FOREIGN KEY (id_carrito) REFERENCES public.carritos(id_carrito);
 i   ALTER TABLE ONLY public.historial_transacciones DROP CONSTRAINT historial_transacciones_id_carrito_fkey;
       public          tiago    false    218    229    3948            �           2606    16510 ?   historial_transacciones historial_transacciones_id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.historial_transacciones
    ADD CONSTRAINT historial_transacciones_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);
 i   ALTER TABLE ONLY public.historial_transacciones DROP CONSTRAINT historial_transacciones_id_usuario_fkey;
       public          tiago    false    3946    229    216            }           2606    16481    pagos pagos_id_carrito_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_id_carrito_fkey FOREIGN KEY (id_carrito) REFERENCES public.carritos(id_carrito);
 E   ALTER TABLE ONLY public.pagos DROP CONSTRAINT pagos_id_carrito_fkey;
       public          tiago    false    218    226    3948            ~           2606    16496 7   producto_categoria producto_categoria_id_categoria_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.producto_categoria
    ADD CONSTRAINT producto_categoria_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categorias(id_categoria);
 a   ALTER TABLE ONLY public.producto_categoria DROP CONSTRAINT producto_categoria_id_categoria_fkey;
       public          tiago    false    227    3950    220                       2606    16491 6   producto_categoria producto_categoria_id_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.producto_categoria
    ADD CONSTRAINT producto_categoria_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);
 `   ALTER TABLE ONLY public.producto_categoria DROP CONSTRAINT producto_categoria_id_producto_fkey;
       public          tiago    false    222    3952    227            z           2606    16448 %   productos productos_id_categoria_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categorias(id_categoria);
 O   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_id_categoria_fkey;
       public          tiago    false    3950    222    220                  x������ � �            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �            x������ � �     
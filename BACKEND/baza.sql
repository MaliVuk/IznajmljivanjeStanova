

ALTER DATABASE db_abb85b_wp8 SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_abb85b_wp8 COLLATE Latin1_General_100_CI_AI_SC_UTF8;
GO
ALTER DATABASE db_abb85b_wp8 SET MULTI_USER;
GO



--use master;
--go
--drop database if exists iznajmljivanje;
--go
--create database iznajmljivanje collate Croatian_CI_AS;
--go
--use iznajmljivanje;
--go

create table najmodavac (
sifra int not null primary key identity (1,1),
ime varchar (50) not null,
prezime varchar (100)
);

create table stan (
sifra int not null primary key identity (1,1),
adresa varchar(100) not null,
datum_uplate_stanarine date null,
najmodavac int not null references najmodavac(sifra)
);

create table rezije (
sifra int not null primary key identity (1,1),
tip varchar (50),
iznos decimal (10,2) ,
datum_placanja datetime null,
stan int not null references stan (sifra)
);

create table najmoprimac (
sifra int not null primary key identity (1,1),
ime_ili_naziv varchar (50) null,
kontakt varchar(50)null
);

create table ugovor (
sifra int not null primary key identity (1,1),
datum_pocetka date null,
datum_zavrsetka date null,
stan  int not null references stan,
najmoprimac int not null references najmoprimac(sifra)
);


--select * from najmodavac
insert into najmodavac(ime,prezime)
values ('Zlata','Vučić');
--delete from najmodavac
--where sifra in (2,3);


insert into stan (adresa,datum_uplate_stanarine,najmodavac)
values ('SLB Mandića 10','2025-04-10',1),
('Medulinska 4','2025-04-10',1);
select * from stan

insert into rezije (tip,iznos,datum_placanja,stan)
values('unikom', 7.50, '2025-04-20', 1),
('unikom', 5.59, '2025-04-20', 2),
('komunalno',5.06, '2025-04-20',1),
('komunalno',6.21, '2025-04-20',2),
('voda',15.57,'2025-04-20',1),
('voda',null,'2025-04-20',2),
('struja',40.61,'2025-04-20',1),
('struja',55.27,'2025-04-20',2),
('plin',null,'2025-04-20',1),
('plin',null,'2025-04-20',2),
('stambeno',12.61,'2025-04-20',1),
('stambeno',17.23,'2025-04-20',2),
('internet',54.46,'2025-04-20',1),
('internet',24.42,'2025-04-20',2),
('porez',null,'2025-04-20',1),
('porez',37.91,'2025-04-20',2);

select * from rezije;

		 
--select * from rezije
--where tip = 'struja'
--  and month (datum_placanja) = 4
--  and year (datum_placanja) = 2025
--  and stan= 1;

--select *from najmoprimac;
insert into najmoprimac(ime_ili_naziv,kontakt)
values ('Erna Rob',0953669852),
       ('Mlinar', 0914232276);




insert into ugovor(datum_pocetka,datum_zavrsetka,stan,najmoprimac)
values ('2025-02-01', null, 1, 1),
	   ('2023-01-01', null, 2, 2);
	   
	   --select* from ugovor;



select stan,sum(iznos) as ukupno_rezije
from rezije
where month (datum_placanja)=4
 and year (datum_placanja)=2025
 group by stan;



--izmjena iznosa i tipa rezija
-- update rezije 
 --set iznos=10.05
 --where stan=1
 --and tip='plin'
 --and iznos is null;
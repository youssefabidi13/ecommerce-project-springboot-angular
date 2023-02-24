USE `full-stack-ecommerce`;

-- clean up previous database table 
set foreign_key_checks=0;

TRUNCATE customer;
truncate ORDERS;
truncate order_item;
truncate address;

set foreign_key_checks=1;
Alter table customer add unique (email);
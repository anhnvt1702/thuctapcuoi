INSERT IGNORE INTO department (department_id, department_name) VALUES
(1,'Một'),
(2,'Hai'),
(3,'Ba');
INSERT IGNORE INTO category (category_id, category_name, description, department_id) VALUES
(1,'Nữ','Mũ cho nữ',1),
(2,'Trẻ em','Mũ dành cho trẻ em',2),
(3,'Nam','Mũ dành cho nam',3);
INSERT IGNORE INTO product (product_id, created_at, description, img1path, price, product_name, stock_quantity, category_id) VALUES
(1,NULL,'Mũ bảo hiểm 3/4 màu xanh dương thời trang, thiết kế chắc chắn, an toàn khi di chuyển.','https://res.cloudinary.com/dkxnkqvrp/image/upload/v1747238833/4nfPGXIMG_4779_x0q3o6.jpg',550000,'Mũ 3/4 màu xanh dương',80,1),
(2,NULL,'Mũ bảo hiểm 3/4 màu kem thanh lịch, thiết kế thời trang, lớp sơn bền màu, mang lại sự an toàn và thoải mái khi di chuyển.','https://res.cloudinary.com/dkxnkqvrp/image/upload/v1747238785/GaiA-G01-30-510x510.jpg_gpli11.webp',350000,'Mũ 3/4 màu Kem',120,1),
(3,NULL,'Mũ bảo hiểm 3/4 màu đen sần cá tính, lớp sơn nhám chống trầy, kiểu dáng thể thao, phù hợp đi phố lẫn đường trường.','https://res.cloudinary.com/dkxnkqvrp/image/upload/v1747238784/M139-Van-Carbon_jh83m4.webp',420000,'Mũ 3/4 màu đen sần',90,1),
(4,NULL,'Mũ bảo hiểm trẻ em in hình Doraemon đáng yêu, đạt tiêu chuẩn an toàn.','https://res.cloudinary.com/dkxnkqvrp/image/upload/v1747238837/doremon_pwmcli.jpg',290000,'Mũ trẻ em Doraemon màu đỏ',60,2),
(5,NULL,'Mũ trẻ em thiết kế hình cá heo ngộ nghĩnh, siêu nhẹ, an toàn cho bé.','https://res.cloudinary.com/dkxnkqvrp/image/upload/v1747238839/asia-730x500_xtl4bf.jpg',300000,'Mũ trẻ em hình cá heo',70,2),
(6,NULL,'Mũ bảo hiểm trẻ em khủng long dễ thương, màu sắc bắt mắt, chất liệu bền đẹp.','https://res.cloudinary.com/dkxnkqvrp/image/upload/v1747238840/huong-dan-chon-mu-bao-hiem-tre-em-dat-chuan-6-730x420_ncgcum.jpg',320000,'Mũ trẻ em hình khủng long',50,2),
(7,NULL,'Mũ bảo hiểm Fullface vỏ carbon siêu nhẹ, kiểu dáng thể thao, bảo vệ tối đa.','https://res.cloudinary.com/dkxnkqvrp/image/upload/v1747238841/ls2-mx701-black-300x300_jy6om3.jpg',1500000,'Mũ Fullface carbon',40,3),
(8,NULL,'Mũ Fullface màu đen bóng sang trọng, lót kháng khuẩn, kính chắn gió chống tia UV.','https://res.cloudinary.com/dkxnkqvrp/image/upload/v1747238841/mu-fullface-avrar_lzpd86.webp',1350000,'Mũ Fullface đen bóng',35,3),
(9,NULL,'Mũ Fullface họa tiết độc đáo, chất liệu cao cấp, phù hợp cho phượt thủ chuyên nghiệp.','https://res.cloudinary.com/dkxnkqvrp/image/upload/v1747238842/kiotviet_c069638371b3f86f3f2ce7584a735470_kj1d2a.jpg',1600000,'Mũ Fullface hình thù đẹp mắt',25,3);

INSERT IGNORE INTO user (avatar, created_at, email, full_name, password, phone, status, updated_at, user_name,is_admin) VALUES
('https://res.cloudinary.com/dkxnkqvrp/image/upload/v1747238840/huong-dan-chon-mu-bao-hiem-tre-em-dat-chuan-6-730x420_ncgcum.jpg','2025-06-13 16:43:44.808653','khong234567890@gmail.com','admin','$2a$10$2oVEqCd9UjOgmhg7YJrfO.IneVLdAcxnl4XZTOTtiFFJsXetjfgz.','0937123231','ACTIVE','2025-06-13 16:43:44.808653','admin',1),
('https://res.cloudinary.com/dkxnkqvrp/image/upload/v1747238840/huong-dan-chon-mu-bao-hiem-tre-em-dat-chuan-6-730x420_ncgcum.jpg','2025-06-21 11:52:02.507690','khongcamxuc1234567890@gmail.com','test','$2a$10$MEmk6wDzOSOi9b1yBZlQtuKUHAW7CP41FWshKC6ubJH9zn6QKJE.S','0927361625','ACTIVE','2025-06-21 11:52:02.507690','test',0),
('https://res.cloudinary.com/dkxnkqvrp/image/upload/v1747238840/huong-dan-chon-mu-bao-hiem-tre-em-dat-chuan-6-730x420_ncgcum.jpg','2025-06-21 11:52:26.501785','khoc1234567890@gmail.com','test1','$2a$10$u9Ik5FObcoS.eIlP4r/ireiwDMBgDtj65P90HZxByy3roIUeKIW1K','0927362325','ACTIVE','2025-06-21 11:52:26.501785','test12',0);
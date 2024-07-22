--お小遣い帳
INSERT INTO allowances (id, kids_id, get_money, used_type, used_money, money_time) VALUES (1, 1, NULL, 'お菓子', 200, '7月20日');
INSERT INTO allowances (id, kids_id, get_money, used_type, used_money, money_time) VALUES (2, 1, NULL, 'まんが', 500, '７月21日');

--保護者情報
INSERT INTO family_user (family_id, mail, pass) VALUES ('YAMADA','yamada@example.com','1234');
INSERT INTO family_user (family_id, mail, pass) VALUES ('OOTA','oota@example.com','1234');
INSERT INTO family_user (family_id, mail, pass) VALUES ('IKEDA','ikeda@example.com','1234');

--タクス情報
INSERT INTO tasks (kids_id, name, content, reg_time, categories_name, task_limit, submit_time, task_image, comment, review_one, review_two, review_three, task_check, no_complete, complete, miss) 
VALUES 
(101, '宿題', '算数の宿題をする', '2024-07-19T09:00:00', '勉強', '2024-07-20T18:00:00', NULL, 'homework.png', '頑張ってね！', TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(102, '掃除', '部屋を掃除する', '2024-07-19T10:00:00', '家事', '2024-07-20T12:00:00', NULL, 'cleaning.png', '綺麗にしてね！', FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE),
(103, '読書', '本を30分読む', '2024-07-19T11:00:00', '趣味', '2024-07-21T18:00:00', NULL, 'reading.png', '楽しんでね！', FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE);


--日記情報
INSERT INTO diaries (kids_id, title, content, reply, date, parent_check, child_check)
VALUES 
    (1, '学校の友達', '友達はとても優しいです。', 'そうですか。', '2024-06-01 10:00:00', true, true),
    (2, '学校の先生', '担任の先生は怖いです。', 'そうですか。', '2024-06-02 10:00:00', true, true),
    (1, '学校の勉強', '今日の数学は難しいです。', '頑張ってください。', '2024-06-03 10:00:00', true, true);
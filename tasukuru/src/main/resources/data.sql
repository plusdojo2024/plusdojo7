INSERT INTO tasks (kids_id, name, content, regtime, categories_name, tasklimit, submittime, taskimage, comment, review_one, review_two, review_three, taskcheck, no_complete, complete, miss) VALUES 
(101, '宿題', '算数の宿題をする', '2024-07-19T09:00:00', '勉強', '2024-07-20T18:00:00', NULL, 'homework.png', '頑張ってね！', TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE);

INSERT INTO tasks (kids_id, name, content, regtime, categories_name, tasklimit, submittime, taskimage, comment, review_one, review_two, review_three, taskcheck, no_complete, complete, miss) VALUES 
(102, '掃除', '部屋を掃除する', '2024-07-19T10:00:00', '家事', '2024-07-20T12:00:00', NULL, 'cleaning.png', '綺麗にしてね！', FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE);

INSERT INTO tasks (kids_id, name, content, regtime, categories_name, tasklimit, submittime, taskimage, comment, review_one, review_two, review_three, taskcheck, no_complete, complete, miss) VALUES 
(103, '読書', '本を30分読む', '2024-07-19T11:00:00', '趣味', '2024-07-21T18:00:00', NULL, 'reading.png', '楽しんでね！', FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE);


--日記情報
INSERT INTO diaries (kids_id, title, content, reply, date, parent_check, child_check)
VALUES 
    (1, '学校の友達', '友達はとても優しいです。', 'そうですか。', '2024-06-01 10:00:00', true, true),
    (2, '学校の先生', '担任の先生は怖いです。', 'そうですか。', '2024-06-01 10:00:00', true, true),
    (1, '学校の勉強', '今日の数学は難しいです。', '頑張ってください。', '2024-06-01 10:00:00', true, true);

--お小遣い帳
INSERT INTO allowances (id, kids_id, get_money, used_type, used_money, money_time) VALUES (1, 1, NULL, 'お菓子', 200, '2024-07-20T18:00:00');
INSERT INTO allowances (id, kids_id, get_money, used_type, used_money, money_time) VALUES (2, 1, NULL, 'まんが',　500, '2024-07-21T18:00:00');

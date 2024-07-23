--お小遣い帳
INSERT INTO allowances (id, kids_id, get_money, used_type, used_money, money_time) VALUES (1000, 1, NULL, 'お菓子', 200, '7月20日');
INSERT INTO allowances (id, kids_id, get_money, used_type, used_money, money_time) VALUES (1001, 1, NULL, 'まんが', 500, '７月21日');
INSERT INTO kids_users (id, current_money) VALUES (1000, '1000');

--保護者情報
INSERT INTO family_user (family_id, mail, pass) VALUES ('YAMADA','yamada@example.com','1234');
INSERT INTO family_user (family_id, mail, pass) VALUES ('OOTA','oota@example.com','1234');
INSERT INTO family_user (family_id, mail, pass) VALUES ('IKEDA','ikeda@example.com','1234');

--タクス情報
INSERT INTO tasks (kids_id, name, content, reg_time, categories_name, task_limit, submit_time, task_image, comment, review_one, review_two, review_three, task_check, no_complete, complete, miss) 
VALUES 
(101, '宿題', '算数の宿題をする', '2024-07-19T09:00:00', '勉強', '2024-07-20T18:00:00', NULL, 'homework.png', '頑張ってね！', TRUE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE),
(102, '掃除', '部屋を掃除する', '2024-07-19T10:00:00', '家事', '2024-07-20T12:00:00', NULL, 'cleaning.png', '綺麗にしてね！', FALSE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE),
(103, '読書', '本を30分読む', '2024-07-19T11:00:00', '趣味', '2024-07-21T18:00:00', NULL, 'reading.png', '楽しんでね！', FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE),
(104, '英単語カード作成', '英単語カードを作る', '2024-07-19T14:00:00', '勉強', '2024-07-22T16:00:00', NULL, 'vocab_cards.png', '単語を覚える準備をしよう！', TRUE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE),
(105, '部屋の片付け', 'おもちゃを片付ける', '2024-07-19T15:00:00', '家事', '2024-07-20T09:00:00', NULL, 'cleaning_toys.png', 'おもちゃを元に戻そうね！', FALSE, FALSE, TRUE, FALSE, TRUE, FALSE, FALSE),
(106, '縄跳び練習', '縄跳びを10分間練習する', '2024-07-19T16:00:00', '運動', '2024-07-21T07:00:00', NULL, 'jump_rope.png', '跳び続けて元気に運動しよう！', FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE),
(107, '絵本を読む', 'お気に入りの絵本を読む', '2024-07-19T17:00:00', '趣味', '2024-07-23T18:00:00', NULL, 'storybook.png', '楽しい物語を読もう！', TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE),
(108, '計算ドリル', '簡単な計算問題を解く', '2024-07-20T09:00:00', '勉強', '2024-07-21T20:00:00', NULL, 'math_drill.png', '計算問題を解いてみよう！', FALSE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE),
(109, 'ごみを分別する', 'ごみをリサイクルに分ける', '2024-07-20T10:00:00', '家事', '2024-07-20T20:00:00', NULL, 'recycling.png', 'ごみをちゃんと分けようね！', FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE),
(110, 'プログラミングゲーム', '簡単なプログラミングゲームを遊ぶ', '2024-07-20T11:00:00', '趣味', '2024-07-22T18:00:00', NULL, 'programming_game.png', 'プログラミングを楽しもう！', FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE),
(111, 'ダンス練習', 'お気に入りのダンスを練習する', '2024-07-20T12:00:00', '運動', '2024-07-21T10:00:00', NULL, 'dance.png', '楽しくダンスしよう！', TRUE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE);


--日記情報
INSERT INTO diaries (kids_id, title, content, reply, date, parent_check, child_check)
VALUES 
    (1, '学校の友達', '友達はとても優しいです。', 'そうですか。', '2024-06-01 10:00:00', true, true),
    (2, '学校の先生', '担任の先生は怖いです。', 'そうですか。', '2024-06-02 10:00:00', true, true),
    (1, '学校の勉強', '今日の数学は難しいです。', '頑張ってください。', '2024-06-03 10:00:00', true, true);
const https = require('https');

// Airtable APIキーとベースIDを設定
const apiKey = 'patO5XWG5ZTqjSX8X.a50b88b51405cf611143d843773036c48c5c4cde8bb0a78cfe1d1e0580122e93';
const baseId = 'appslLeij6lH9pznq';
const tableName = 'Members'; // Airtableのテーブル名

// POSTデータを作成
const postData = JSON.stringify({
  fields: {
    Name: 'John Doe',
    Email: 'john.doe@example.com',
  },
});

// POSTリクエストのオプションを設定
const options = {
  hostname: 'api.airtable.com',
  path: `/v0/${baseId}/${tableName}`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'Content-Length': postData.length,
  },
};

// HTTPリクエストを送信
const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 201) {
      console.log('新しい会員が登録されました。');
      console.log(JSON.parse(data));
    } else {
      console.error('会員登録中にエラーが発生しました。');
      console.error(data);
    }
  });
});

req.on('error', (error) => {
  console.error('リクエスト中にエラーが発生しました。');
  console.error(error);
});

// POSTデータをリクエストボディに書き込む
req.write(postData);

// リクエストの送信
req.end();

require('dotenv').config();

const Twit = require('twit');
const request = require('request');

var T = new Twit ({
	consumer_key: process.env.TWIT_CONSUMER_KEY,
	consumer_secret: process.env.TWIT_CONSUMER_SECRET,
	access_token: process.env.TWIT_ACCESS_TOKEN,
	access_token_secret: process.env.TWIT_ACCESS_TOKEN_SECRET
});

var swiftAPI ='https://explorer.swiftcash.cc/api/info';

tweeter();
liker();




setInterval(tweeter, 1000*60*60*8);

function tweeter() {
	request(swiftAPI, gotData);
	function gotData (err,res,body){
		if(!err) {
			var data = JSON.parse(body);
			var jackpot = data.lotteryjackpot;
			var rate = Number(data.hodlbestrate*100).toFixed(2);
		}
	
	var tweetsDB = [
		'The #SwiftCash Lottery Jackpot is currently ' + jackpot + ' $SWIFT #SwifCash #Bitcoin #Crypto #Altcoin',
		'HODL Deposits pay interest to lock away your $SWIFT. The 12 month rate is currently ' + rate + '% APR. #SwifCash #Bitcoin #Crypto #DeFi',
		'Decentralized on chain #SwiftCash Lottery Jackpot is currently ' + jackpot + ' $SWIFT. Visit https://swiftcash.cc for more info #SwifCash #Bitcoin #Crypto #Altcoin',
		'No ruggable smart contracts, lock away your $SWIFT on chain for 1 - 12 months to earn interest. The 12 month rate is currently ' + rate + '% APR. #SwifCash #Bitcoin #Crypto #Altcoin #Finance #DeFi',
		'Our block rewards are distributed, 80% Hodl Desposits, 10% Miners, 10% Node Operators. It pays to save #SwiftCash #Bitcoin #AltCoin',
		'Did you know our #SwiftCash open-source wallet https://wallet.swiftcash.cc is also available on @github and supports #Bitcoin #Litecoin #Dogecoin',
		'DeLotts Jackpot is currently ' + jackpot + ' $SWIFT. Find out more at https://swiftcash.cc #SwiftCash #Bitcoin #Lotto #Crypto #Blockchain',
		'Join our #Telegram channel and join the conversation https://t.me/swiftcashcc #Bitcoin #SwiftCash #Altcoin #Dogecoin #DeFi',
		'Right now you can earn ' + rate + '% APR with HODL Depsosits. No smart contract required! Find out more at https://swiftcash.cc #SwiftCash #Finance #Bitcoin #Crypto #Blockchain #DeFi',
		'The best projects are the ones that grow organically https://swiftcash.cc #SwiftCash #Bitcoin #Blockchain #DeFi #Altcoin #Crypto',
		'The 12 month hodl desposit APR is currently ' + rate + '% #SwiftCash #Bitcoin #Altcoin #Crypto #DeFi',
		'Did you know you can now trade #SwiftCash vs. #USDT on #Altmmarkets https://v2.altmarkets.io/trading/swiftusdt… #SwiftCash #Bitcoin #Crypto #Blockchain',
		'The SwiftCash Lottery Jackpot currently stands at ' + jackpot + ' $SWIFT. The current HODL Deposit rate for 12 months is ' + rate + '% APR. Find out more at https://swiftcash.cc #SwiftCash #Bitcoin #Crypto #Blockchain',
		'New ideas are always welcome at #SwiftCash, join our Discord https://discord.swiftcash.cc and you could get your idea funded #Bitcoin #DeFi #Crypto #Altcoin',
		'Lock away your $SWIFT on chain for 1 - 12 months with HODL Deposits and receive your interest instantly on a time locked address #Blockchain #Bitcoin #SwiftCash #DeFi #Crypto',
		'SwiftCash lottery is conducted entirly on-chain. The SwiftCash decentralized blockchain draws the winners and payouts the winners every 5000 blocks. Jackpot for this round is currently ' + jackpot + ' $SWIFT'
        ];
		
	var tweet = tweetsDB[Math.floor(Math.random() * tweetsDB.length)];
	console.log(tweet);	
	T.post('statuses/update', { status: tweet }, function(err,data,res){
		if(err){
			console.log(error);
		} else {
			console.log('Succsess: Tweeted ' + data.text);
		}
	});
	var tweet ='';	
}}


// Use for targeted specific keywords
function liker(){
	var keyWords = 'swiftcash, pivx, smartcash';
	var stream = T.stream('statuses/filter', { track: keyWords });
	stream.on('tweet', gotTweet);
	function gotTweet(tweet){
		T.post('favorites/create', { id: tweet.id_str }, function(err,data,res){
			if(err){
				console.log(err.message);
			} else {
				console.log('Liked tweet: ' + tweet.id);
			}
		})
	} 
}

var queue = [];

setInterval(ctLiker, 1000*60*30);

function ctLiker() {
	console.log('You have ' + queue.length + ' tweets in the queue');
	if (queue.length > 0) {
		var index = Math.floor(Math.random()* queue.length);
		var tweetID = queue[index];
		console.log('Liking ' + tweetID + ' .......');
		queue = [];
		
		T.post('favorites/create', { id: tweetID }, function(err,data,res){
			if(err){
				console.log('Error: ' + err.message);
			}
			else {
				console.log('Liked: ' + tweetID);
				 }
			}
		)}
		
	else {
		console.log('No tweets to like');
		 }
	}
	

var ctHashtag = '#Crypto';
var regex = /#Crypto/;

var stream = T.stream('statuses/filter', { track: ctHashtag });
stream.on('tweet', gotTweet);
function gotTweet(tweet){
	if(regex.test(tweet.text)){
		console.log('Adding ' + tweet.id_str);
		queue.push(tweet.id_str);
	}
}

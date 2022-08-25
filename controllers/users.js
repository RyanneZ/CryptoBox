const User = require('../models/user');
const jwt = require('jsonwebtoken'); // import the jwt library
const bcrypt = require('bcrypt'); // import bcrypt

const SALT_ROUNDS = 6;

module.exports = {
  create,
  login,
  deposit,
  buy,
  portfolio,
};

async function create(req, res) {
  try {
    // NOTE: here we are storing a plaintext password. VERY VERY DANGEROUS. We will replace this in a second:
 
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS)
    const user = await User.create({name: req.body.name, email:req.body.email, password:hashedPassword,});

    // creating a jwt: 
    // the first parameter specifies what we want to put into the token (in this case, our user document)
    // the second parameter is a "secret" code. This lets our server verify if an incoming jwt is legit or not.

    const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });

    res.status(200).json(token); // send it to the frontend

  } catch (err) {
    res.status(400).json(err);
  }
}


async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    // check password. if it's bad throw an error.
    if (!(await bcrypt.compare(req.body.password, user.password))) throw new Error();

    // if we got to this line, password is ok. give user a new token.
    const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
   
    res.json(token)
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

async function deposit(req, res) {
  try {
    // 1. put the order in the database (the data will be incoming via `req.body`)
    const user = await User.findOne({ email: req.body.email });
    const amount = user.deposit.push({amount: req.body.amount});
  
    await user.save()
    let result =  await getBalances(req.body.email)
  
    // 2. send a response to frontend - typically we send back the newly created order, or all the list of orders, or just an 'ok'
    res.status(200).json(result)
 } catch(err) {
    res.json(err);
 }
}

async function buy(req, res) {

 
  try {
    // 1. put the order in the database (the data will be incoming via `req.body`)
    const user = await User.findOne({ email: req.body.email });
    const trade = user.transaction.push(req.body);
    await user.save()
    let result =  await getBalances(req.body.email)
    // // 2. send a response to frontend - typically we send back the newly created order, or all the list of orders, or just an 'ok'
    res.status(200).json(result)
 } catch(err) {
    res.json(err);
 }
}
async function portfolio(req, res) { 
  try {
    // 1. put the order in the database (the data will be incoming via `req.body`)
    let result =  await getBalances(req.body.email)
    // // 2. send a response to frontend - typically we send back the newly created order, or all the list of orders, or just an 'ok'
    res.status(200).json(result)
 } catch(err) {
    res.json(err);
 }
}


async function getBalances(email) {
  const coinList = ['Bitcoin', "Ethereum","Tether USD", "USDC","Binance Coin", "Binance USD","XRP","Cardano", "HEX","Solana"]
  let balances = {currency: 0}
  coinList.forEach(element => {
    balances[element] = 0
  })
  
  const user = await User.findOne({ email });
  let balanceInitial = 0
  let balance = user.deposit.reduce((a,b) => a + b.amount,balanceInitial )
  balance = user.transaction.reduce((a,b) => a - 1*b.amountCurrency, balance)
  for (let i = 0; i < user.transaction.length; i++) {
    balances[user.transaction[i].coinName] += 1*[user.transaction[i].amountCoin]
    
  }
  balances['currency'] = balance
  

  return balances
}


require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Grabs all the expenses from the Supabase database
 */
const getExpenses = async () => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('id', { ascending: true }); 
    
  if (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
  return data;
};

/**
 * Finds a single expense by its id
 * @param {any} id - the id from the url params
 */
const getExpenseById = async (id) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('id', parseInt(id))
    .single();
    
  if (error) return null;
  return data;
};

/**
 * Adds a new expense object to the database
 * @param {Object} expenseData
 */
const addExpense = async (expenseData) => {
  const newExpense = {
    amount: expenseData.amount,
    category: expenseData.category,
    date: expenseData.date
  };
  
  const { data, error } = await supabase
    .from('expenses')
    .insert([newExpense])
    .select() // need to select to get the auto-generated id back
    .single();
    
  if (error) {
    console.error('Error inserting expense:', error);
    return null;
  }
  
  return data;
};

/**
 * Updates an expense if it exists
 * @param {any} id 
 * @param {Object} expenseData 
 */
const updateExpense = async (id, expenseData) => {
  // only update fields that were provided
  const updateData = {};
  if (expenseData.amount) updateData.amount = expenseData.amount;
  if (expenseData.category) updateData.category = expenseData.category;
  if (expenseData.date) updateData.date = expenseData.date;
  
  const { data, error } = await supabase
    .from('expenses')
    .update(updateData)
    .eq('id', parseInt(id))
    .select()
    .single();
    
  if (error) return null;
  return data;
};

/**
 * Deletes an expense by its id
 * @param {any} id 
 */
const deleteExpense = async (id) => {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', parseInt(id));
    
  if (error) return false;
  return true;
};

module.exports = {
  getExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense
};

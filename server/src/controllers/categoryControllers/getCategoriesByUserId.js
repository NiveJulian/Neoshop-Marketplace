const { category } = require('../../db');

async function getCategoriesByUserId(userId) {
  try {
    if (!userId) {
      throw new Error("Missing data");
    }
    const categories = await category.findAll({
      where: { userId }
    });
    return categories;
  } catch (error) {
    throw new Error(`Error getting categories for user ${userId}: ${error.message}`);
  }
}

module.exports = getCategoriesByUserId;
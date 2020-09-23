const paginate = (page) => {
  const pageSize = 10;

  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  return {
    offset,
    limit,
  };
};

module.exports = paginate;

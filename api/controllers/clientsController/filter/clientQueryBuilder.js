export const buildClientQuery = (name, note) => {
  console.log("buildClientQuery:");
  let query = {};

  if (name && name.trim() !== "") {
    query.$or = [
      { firstName: { $regex: new RegExp(name, "i") } },
      { lastName: { $regex: new RegExp(name, "i") } },
    ];
  }

  if (note && note.trim() !== "") {
    query.notesAdmin = { $type: "array", $not: { $size: 0 } };
  }
  // console.log(
  //   "*************** query dans buildClientQuery *************:",
  //   JSON.stringify(query, null, 2)
  // );

  return query;
};
  
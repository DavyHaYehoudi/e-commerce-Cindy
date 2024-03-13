export const buildOrderQuery = (
  trackingNumber,
  steps,
  preciseDate,
  rangeDateStart,
  rangeDateEnd
) => {
//   console.log("buildOrderQuery:");
  const conditions = [];

  // Ajouter les critères à la liste en fonction de leur existence
  if (trackingNumber && trackingNumber.trim() !== "") {
    conditions.push({
      trackingNumber: {
        $type: "array",
        $not: { $size: 0 },
      },
    });
  }
  if (steps && steps.trim() !== "") {
    const stepsArray = steps.split(",").map(Number);
    conditions.push({ step: { $in: stepsArray } });
  }
  // Cas où seule une date précise est fournie
  if (preciseDate.trim() !== "") {
    const startOfDay = new Date(`${preciseDate}T00:00:00.000Z`);
    const endOfDay = new Date(`${preciseDate}T23:59:59.999Z`);
    conditions.push({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });
  }
  // Cas où un range de dates est fourni
  if (rangeDateStart.trim() !== "" && rangeDateEnd.trim() !== "") {
    const rangeDateStartObject = new Date(`${rangeDateStart}T00:00:00.000Z`);
    const rangeDateEndObject = new Date(`${rangeDateEnd}T23:59:59.999Z`);
    conditions.push({
      createdAt: {
        $gte: rangeDateStartObject,
        $lte: rangeDateEndObject,
      },
    });
  }

  // Combiner les conditions avec un "ou"
  const query = conditions.length > 0 ? { $or: conditions } : {};

//   console.log(
//     "*************** query dans buildOrderQuery *************:",
//     query
//   );
  return query;
};

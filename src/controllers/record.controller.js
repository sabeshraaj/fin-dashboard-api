import prisma from "../prisma.js";
export const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    const record = await prisma.record.create({
      data: {
        amount,
        type,
        category,
        date: new Date(date), 
        notes,
        userId: req.user.userId, 
      },
    });

    res.status(201).json({ message: "Record created successfully", record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create record" });
  }
};


export const getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    
    const whereClause = {
      deletedAt: null, 
    };

    if (type) whereClause.type = type;
    if (category) whereClause.category = category;
    
    
    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = new Date(startDate);
      if (endDate) whereClause.date.lte = new Date(endDate);
    }

    const records = await prisma.record.findMany({
      where: whereClause,
      orderBy: { date: 'desc' }, // Newest first
    });

    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};


export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, category, date, notes } = req.body;

    const record = await prisma.record.update({
      where: { id: Number(id) },
      data: {
        amount,
        type,
        category,
        date: date ? new Date(date) : undefined,
        notes,
      },
    });

    res.status(200).json({ message: "Record updated successfully", record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update record" });
  }
};


export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    
    await prisma.record.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete record" });
  }
};
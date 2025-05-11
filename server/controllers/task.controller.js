export const getTasks = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in getting All Tasks: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getTask = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in geting Task: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const createTask = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in Creating Task: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const updateTask = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in Updating Task: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const deleteTask = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in Deleting Task: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

import sequelize from "./config.js";
import "./associations.js"
const connectToDB = async () => {
    try {
        await sequelize.sync({alter:true});
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    
}
export default connectToDB;
const { connect } = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserRepository {
  db = {};

  constructor() {
    this.db = connect();

    this.db.sequelize.sync({ force: true }).then(() => {
      console.log(
        "Database " + process.env.DB_NAME + " has being setup and configured"
      );
    });
  }

  async getUsers() {
    const users = await this.db.users.findAll();
    return users;
  }

  async createUser(user) {
    let data = {};
    let userData = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: await bcrypt.hash(user.password, 10),
    };

    try {
      data = await this.db.users.create(userData);
      return { message: "User created successfully", data };
    } catch (error) {
      console.log(error.errors);
    }
  }

  async login(user) {
    const { email, password } = user;

    try {
      const user = await this.db.users.findOne({ where: { email: email } });

      if (user) {
        const isSame = await bcrypt.compare(password, user.password);

        if (isSame) {
          let token = jwt.sign({ id: user.id }, process.env.secretKey, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          });

          return { message: "Login successfully", user, token };
        } else {
          return { message: "Login Failed" };
        }
      } else {
        return { message: "Login Failed" };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(user) {
    let data = {};
    data = await this.db.users.update(
      { ...user },
      {
        where: {
          id: user.id,
        },
      }
    );

    return data;
  }

  async getUserById(userId) {
    const users = await this.db.users.findByPk(userId);
    return users;
  }

  async deleteUser(userId) {
    let data = {};
    data = await this.db.users.destroy({
      where: {
        id: userId,
      },
    });

    return {message: "Deleted successfully",data};
  }
}

module.exports = new UserRepository();

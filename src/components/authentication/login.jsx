import React, { Component } from "react";
import LoginRender from "../pages/users/loginRender";
import Joi from "joi-browser";
import auth from "../../services/authService";

class Login extends Component {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5),
  };

  validate = () => {
    //Joi默认在一个验证不通过情况下就会终止后续的验证，所以{abortEarly: false}表示所有的都要验证
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    //如果没有joi验证通过没有error，返回空
    if (!result.error) return null;
    //否则我们就把result.error映射到我们的errors对象中去
    const errors = {};
    //这样就把数组映射到对象中去了
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    //如果errors为真我们就赋值，否则我们就给它一个空对象{}而不是不处理系统给自动给它null
    //换句话说errors属性永远是个对象，它再也不会是null
    this.setState({ errors: errors || {} });
    //如果有errors，直接返回，后续服务器操作不执行了
    if (errors) return;
    this.doSubmit();
  };

  doSubmit = async () => {
    try {
      const data = this.state.data;
      await auth.login(data.email, data.password);
      //看用户在哪个页面登录的，我们需要锁定一下，让之后用户登录后跳转到之前访问的页面
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
      // window.location = "/";
    } catch (ex) {
      //bad request
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  //使用对象析构重命名input代替 e.currentTarget的形参更方便理解
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    //为了解决用户在单个区域输入显示错误，我们需要创建另一个单独的验证函数
    //因为validate函数会验证所有的表单属性，这不是我们想要的
    const errorMessage = this.validateProperty(input);
    //如果有错误信息，就把错误信息装载进errors数组中去(如果input.name是username，那错误信息提示就是username)
    if (errorMessage) errors[input.name] = errorMessage;
    //如果没有得到错误信息，我们就需要删除现有属性，这样errors就被清空了
    else delete errors[input.name];

    const data = { ...this.state.data };
    //使用中括号来动态的给输入参数操作——这样username,password都可以在下面这句代码里操作了
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  validateProperty = ({ name, value }) => {
    //由于需要验证单个属性，这里使用es6语法[name]动态的传入域来赋值
    const obj = { [name]: value };
    //同理由于传入的单个obj，schema的验证也是单个的子schema
    const schema = { [name]: this.schema[name] };
    //这里没有必要添加{abortEarly: false}，因为单个属性的验证(比如username),不需要验证所有，提示给用户一个错误后就返回终止
    //const{error} = const result.error = .....
    const { error } = Joi.validate(obj, schema);
    //如果error为真，返回details数组中第一项的message信息，否则返回null
    return error ? error.details[0].message : null;
  };

  render() {
    const { errors, data } = this.state;
    return (
      <LoginRender
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        data={data}
        errors={errors}
      />
    );
  }
}

export default Login;

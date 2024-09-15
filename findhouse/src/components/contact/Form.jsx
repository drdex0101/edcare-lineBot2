import { useRef } from 'react';
const Form = () => {
  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const timeRef = useRef();
  const requireRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/fullcontact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        phone: phoneRef.current.value,
        email: emailRef.current.value,
        requirement: requireRef.current.value,
        time: timeRef.current.value,
      }),
    });

    if (response.ok) {
      alert("提交成功，請待客服人員與您聯絡。");

      // 清空表單
      nameRef.current.value = '';
      phoneRef.current.value = '';
      emailRef.current.value  = '',
      requireRef.current.value  = '',
      timeRef.current.value  = ''

    } else {
      const errorMsg = await response.text();
      alert("提交失敗: " + errorMsg);
    }
  };
  return (
    <form className="contact_form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <input
              id="form_name"
              name="form_name"
              ref={nameRef}
              className="form-control"
              required="required"
              type="text"
              placeholder="姓名"
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <input
              id="form_email"
              name="form_email"
              ref={emailRef}
              className="form-control required email"
              required="required"
              type="email"
              placeholder="Email"
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <input
              id="form_phone"
              name="form_phone"
              className="form-control required phone"
              required="required"
              type="phone"
              ref={phoneRef}
              placeholder="手機"
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <input
              id="form_subject"
              name="form_subject"
              className="form-control required"
              required="required"
              type="text"
              ref={timeRef}
              placeholder="聯絡時間"
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-12">
          <div className="form-group">
            <textarea
              id="form_message"
              name="form_message"
              className="form-control required"
              rows="8"
              required="required"
              ref={requireRef}
              placeholder="您的需求"
            ></textarea>
          </div>
          {/* End .col */}

          <div className="form-group mb0">
            <button type="submit" className="btn btn-thm">
              和我聯絡
            </button>
          </div>
          {/* End button submit */}
        </div>
      </div>
    </form>
  );
};

export default Form;

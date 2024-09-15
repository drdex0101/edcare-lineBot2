import { useRef } from 'react';

const ContactWithAgent = () => {
  const nameRef = useRef();
  const phoneRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/saveData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        phone: phoneRef.current.value,
      }),
    });

    if (response.ok) {
      alert("提交成功，請待客服人員與您聯絡。");

      // 清空表單
      nameRef.current.value = '';
      phoneRef.current.value = '';

    } else {
      const errorMsg = await response.text();
      alert("提交失敗: " + errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="sasw_list mb0">
        <li className="search_area">
          <div className="form-group mb-3">
            <input
              ref={nameRef}
              type="text"
              className="form-control"
              placeholder="姓名"
              required
            />
          </div>
        </li>
        {/* End li */}
        <li className="search_area">
          <div className="form-group mb-3">
            <input
              ref={phoneRef}
              type="number"
              className="form-control"
              placeholder="手機"
              required
            />
          </div>
        </li>
        {/* End li */}
        <li>
          <div className="search_option_button">
            <button type="submit" className="btn btn-block btn-thm w-100">
              和我聯絡
            </button>
          </div>
        </li>
        {/* End li */}
      </ul>
    </form>
  );
};

export default ContactWithAgent;

import Modal from './Modal';
import './Modal.css';
import Button from 'react-bootstrap/Button';

export class ModalMessage extends Modal {
  render() {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, ok, msg } = this.props;
    const { from, to, read, body } = msg;

    return (
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              {header}
              <Button variant="secondary" className="close" onClick={close}>
                {' '}
                &times;{' '}
              </Button>
            </header>
            <main>
              <div>
                <label for="inputFrom" className='text-bold'>발신자</label>
                <input id="inputFrom"></input>
              </div>
              <div>
                <label for="inputTo" className='text-bold'>수신자</label>
                <input id="inputTo"></input>
              </div>
              <div>
                <label for="inputTo">읽음</label>
                <input type="checkbox" id="inputTo"></input>
              </div>
              <div className='my-3 border'>
                <label for="inputBody" className='text-bold pb-2'>내용</label>
                <textarea id="inputBody" className='p-2'></textarea>
              </div>
              {this.props.children}
            </main>
            <footer>
              {ok ? (
                <Button variant="primary" className="ok" onClick={ok}>
                  {' '}
                  확인{' '}
                </Button>
              ) : null}
              <Button variant="secondary" className="close" onClick={close}>
                {' '}
                닫기{' '}
              </Button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  }
}

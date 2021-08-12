import React, {Component} from 'react';
import "./Modal.css";
import Button from 'react-bootstrap/Button'

export class Modal extends Component {
    render() {
        // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
        const { open, close, header, ok } = this.props;

        return (
            <div className={ open ? 'openModal modal': 'modal' }>
                { open ? (  
                    <section>
                        <header>
                            { header }
                            {/* <Button variant="secondary" className="close" onClick={close}> &times; </Button> */}
                        </header>
                        <main>
                            {this.props.children}
                        </main>
                        <footer>
                            {ok ? <Button variant="primary" className="ok" onClick={ok}> 확인 </Button> : null}
                            <Button variant="secondary" className="close d-flex mx-auto" onClick={close}> 닫기 </Button>
                        </footer>
                    </section>
                ) : null }
            </div>
        )
    }
}
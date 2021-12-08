import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import Menu from '../../components/Navigation/Menu';

import { PC, Mobile } from '../../components/MediaQuery';


class ExelTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    goLogin = () => {
        this.props.history.push('/');
    };


    render() {
        const { userinfo } = this.props;
        console.log('userinfo : ', userinfo);
        return (
            <div  >
                <Header />
                <Navigation goLogin={this.goLogin} />
                <div >
                    <Menu />
                    <PC>
                        <article >
                            <div >
                                <h4 >
                                    asd
                                </h4>
                            </div>
                        </article>
                    </PC>
                    <Mobile>
                        <article >
                            <div >
                                <h4 >
                                    asd
                                </h4>
                            </div>
                        </article>
                    </Mobile>
                </div>
                <Footer />
            </div>
        );
    }
}
const ExelTableStateToProps = (state) => {
    return {
        userinfo: state.authentication.userinfo,
        status: state.authentication.status,
    };
};

export default connect(ExelTableStateToProps, undefined)(ExelTable);
import { Component } from '../../core/index.js';

class sectionHeading extends Component {
    render(){
        const sectionHeading = document.createElement('h2');
        sectionHeading.setAttribute('class', 'ir');
        sectionHeading.innerText = this.props.text;

        return sectionHeading;
    }
}

export default sectionHeading;
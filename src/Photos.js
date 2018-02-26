import React, {Component} from 'react';
import './App.css';
import Unsplash, {toJson} from 'unsplash-js';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {blueGrey500} from 'material-ui/styles/colors';
import StackGrid from 'react-stack-grid';
import {connect} from 'react-redux';

const unsplash = new Unsplash({
  applicationId: "c31e5bd4d4ff9502ced6f5b0038895f9269d366f6a4c0c3ca8a5ad0c33c457b2",
  secret: "5bfd980ebffc6bc048c75f8c45094eec3ff3630b78daf99ca5db11dcca4d7273",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

class Photos extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      photos: [],
      open: false,
      error: ""
    })
  }

  handleOpen = (err) => {
    this.setState({
      open: true,
      error: err
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleLink = (username) => {
    window.location.href = 'https://unsplash.com/@' + username;
  };

  getPhotos(keyword) {
    if (keyword === "") {
      unsplash.photos.getRandomPhoto({count: "25"})
        .then(res => {
          if (res.status === 200)
            return toJson(res);
          else
            throw res.status.toString() + " Error";
        })
        .then(json => {
          this.setState({
            photos: json
          });
        })
        .catch(err => {
          this.handleOpen(err);
        });
    } else {
      unsplash.search.photos(keyword, 1, 25)
        .then(res => {
          if (res.status === 200)
            return toJson(res);
          else
            throw res.status.toString() + " Error";
        })
        .then(json => {
          this.setState({
            photos: json.results
          });
        })
        .catch(err => {
          this.handleOpen(err);
        });
    }

  }

  componentDidMount() {
    this.getPhotos("");
  }

  componentWillReceiveProps(nextProps) {
    this.getPhotos(nextProps.keyword);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.grid);
    this.grid.updateLayout();
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ];
    const w = 300;
    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.state.error}
        </Dialog>
        <StackGrid
          columnWidth={w}
          gutterWidth={20}
          gutterHeight={20}
          monitorImagesLoaded={true}
          gridRef={grid => this.grid = grid}
        >
          {this.state.photos.map((photo, x) => (
            <Card key={x}>
              <CardHeader
                title={<FlatButton label={photo.user.username}
                                   onClick={() => this.handleLink(photo.user.username)}/>}
                avatar={photo.user.profile_image.large}
              />
              <CardMedia>
                <img src={photo.urls.small} width={w}/>
                <a className="Download" href={photo.urls.full} download>
                  <FileDownload hoverColor={blueGrey500}/>
                </a>
              </CardMedia>
            </Card>
          ))}
        </StackGrid>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    keyword: state.keyword
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

const ConnectedPhotos = connect(
  mapStateToProps,
  mapDispatchToProps
)(Photos);

export default ConnectedPhotos;

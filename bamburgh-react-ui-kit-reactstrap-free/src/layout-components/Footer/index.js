import React, { Fragment, Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Row,
  Col,
  CardBody,
  Card,
  UncontrolledTooltip,
  Nav,
  NavItem,
  NavLink,
  Button,
  FormText,
  Form,
  Label,
  FormGroup,
  Input,
} from 'reactstrap';

class Footer extends Component {
  render() {
    return (
      <Fragment>
        <div className="app-footer-wrapper mt-5">
          <div className="bg-first py-5">
            <div className="container pt-sm-0 pt-md-5">
              <div className="px-0 col-lg-6 col-md-8 col-sm-12 mx-auto text-center">
                <h1 className="display-3 mb-4 text-white font-weight-bold">
                  Stay in touch with us 
                </h1>
                <p className="font-size-lg text-white-50">
                  Follow us on any of our social media to find out when
                  we release new products or updates.
                </p>
              </div>
              <div className="divider border-2 d-sm-none d-md-block rounded-circle border-white bg-white opacity-2 mx-auto mb-4 mt-5 w-50" />
              <Nav className="nav-transparent justify-content-center">
                <NavItem>
                  <NavLink
                    className="nav-link text-white-50"
                    href="https://www.facebook.com/FlexCorporate/"
                    rel="nofollow"
                    target="_blank"
                    id="btnFacebookTooltip3457">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'facebook']}
                        className="font-size-xxl"
                      />
                    </span>
                  </NavLink>
                  <UncontrolledTooltip target="btnFacebookTooltip3457">
                    Facebook
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link text-white-50"
                    href="https://twitter.com/flexintl"
                    rel="nofollow"
                    target="_blank"
                    id="btnTwitterTooltip3457">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'twitter']}
                        className="font-size-xxl"
                      />
                    </span>
                  </NavLink>
                  <UncontrolledTooltip target="btnTwitterTooltip3457">
                    Twitter
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link text-white-50"
                    href="https://www.instagram.com/flexintl/"
                    rel="nofollow"
                    target="_blank"
                    id="btnInstagramTooltip3457">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'instagram']}
                        className="font-size-xxl"
                      />
                    </span>
                  </NavLink>
                  <UncontrolledTooltip target="btnInstagramTooltip3457">
                    Instagram
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link text-white-50"
                    href="https://www.youtube.com/c/flexintl"
                    rel="nofollow"
                    target="_blank"
                    id="btnYoutubeTooltip3457">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'youtube']}
                        className="font-size-xxl"
                      />
                    </span>
                  </NavLink>
                  <UncontrolledTooltip target="btnYoutubeTooltip3457">
                    Youtube
                  </UncontrolledTooltip>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link text-white-50"
                    href="https://www.linkedin.com/company/flexintl/"
                    rel="nofollow"
                    target="_blank"
                    id="btnLinkedInTooltip3457">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon
                        icon={['fab', 'linkedin']}
                        className="font-size-xxl"
                      />
                    </span>
                  </NavLink>
                  <UncontrolledTooltip target="btnLinkedInTooltip3457">
                    LinkedIn
                  </UncontrolledTooltip>
                </NavItem>
              </Nav>
              <div className="divider border-2 d-sm-none d-md-block rounded-circle border-white bg-white opacity-2 mx-auto my-4 w-50" />
              <div className="px-0 col-lg-6 col-md-8 col-sm-12 mx-auto text-center">
                <Card className="border-0 mt-5 card-box">
                  <CardBody>
                    <div className="text-black">
                      <h1 className="display-4 mb-3 font-weight-bold">
                        Any problem with the dashboard?
                      </h1>
                      <p className="font-size-md mb-4 text-black-50">
                        If you find any issue or problem while working with the dashboard, 
                        send us a message so we can improve your experience. 
                      </p>
                      <Form>
                        <FormGroup>
                          <Label htmlFor="exampleEmail" align="left">Email</Label>
                          <Input
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="Your email address"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="exampleText">How can we help you?</Label>
                          <Input type="textarea" name="text" id="exampleText" placeholder="Tell us a bit about the issue you're facing"/>
                        </FormGroup>
                        <Button
                          block
                          className="w-100"
                          color="first"
                          id="mc-embedded-subscribe"
                          name="contact"
                          type="submit">
                          <span className="btn-wrapper--label">
                            Contact
                          </span>
                        </Button>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div className="mt-5">
                <small className="text-center d-block text-white-50">
                  &copy; 2020 FLEX LTD. All rights reserved. - 
                  Flextronics International, LTD. All rights reserved.
                </small>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Footer;

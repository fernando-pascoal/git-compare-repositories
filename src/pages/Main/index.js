import React, { Component } from "react";
import { api } from "../../services/api";
import moment from "moment";

import logo from "../../assets/logo.png";
import CompareList from "../../components/CompareList";

import { Container, Form, Message } from "./styles";

export default class Main extends Component {
    state = {
        repositoryInput: "",
        repositories: [],
        repositoryError: false,
        errorMessage: "",
        loading: false,
        repositoryStorageName: "repositoriesStorage"
    };

    componentDidMount() {
        const nameStorage = this.state.repositoryStorageName;
        const storage = localStorage.getItem(nameStorage);
        const repositories = JSON.parse(storage);

        if (!repositories) return;

        this.setState({ repositories });
    }
    setStorage() {
        const name = this.state.repositoryStorageName;
        const arq = this.state.repositories;
        if (typeof Storage !== "undefined") {
            localStorage.setItem(name, JSON.stringify(arq));
        } else {
            this.setError("Seu navegador não permite salvar os repositorios");
        }
    }

    setError(errorMessage) {
        this.setState({ errorMessage, repositoryError: true });
        setTimeout(() => {
            this.setState({ errorMessage: "", repositoryError: false });
        }, 3000);
    }

    handleAddRepository = async e => {
        e.preventDefault();

        this.setState({ loading: true });
        try {
            const { data: repository } = await api.get(
                `/repos/${this.state.repositoryInput}`
            );

            const exists = this.state.repositories.filter(repo => {
                const result = repository.id === repo.id ? true : false;
                return result;
            });

            if (exists.length) {
                this.setError("Você já inseriu esse repositório");
                return;
            }

            repository.lastCommit = moment(repository.pushed_at).fromNow();

            this.setState({
                repositories: [...this.state.repositories, repository],
                repositoryInput: ""
            });

            this.setStorage();
        } catch (error) {
            this.setError("Não encontramos seu repositorio");
        } finally {
            this.setState({ loading: false });
        }
    };

    handleRemoveRepository = id => {
        const repositories = this.state.repositories.filter(repository => {
            return repository.id === id ? false : true;
        });
        this.setState({ repositories }, _ => this.setStorage());
    };

    handleUpdateRepoditory = async fullName => {
        try {
            const { data: repository } = await api.get(`/repos/${fullName}`);
            const repositories = this.state.repositories.map(repo => {
                if (repository.id === repo.id) {
                    repository.lastCommit = moment(
                        repository.pushed_at
                    ).fromNow();
                    return repository;
                } else {
                    repo.lastCommit = moment(repo.pushed_at).fromNow();
                    return repo;
                }
            });
            this.setState({ repositories }, this.setStorage());
        } catch (error) {
            this.setError("Não foi possível atualizar");
        }
    };

    render() {
        return (
            <Container>
                <Message withError={this.state.repositoryError}>
                    {this.state.errorMessage}
                </Message>
                <img src={logo} alt="github compare" />
                <Form
                    withError={this.state.repositoryError}
                    onSubmit={this.handleAddRepository}
                >
                    <input
                        type="text"
                        placeholder="usuario/repositorio"
                        value={this.state.repositoryInput}
                        onChange={e =>
                            this.setState({ repositoryInput: e.target.value })
                        }
                    />
                    <button type="submit">
                        {this.state.loading ? (
                            <i className="fa fa-spinner fa-pulse" />
                        ) : (
                            "ok"
                        )}
                    </button>
                </Form>
                <CompareList
                    repositories={this.state.repositories}
                    removeFunction={this.handleRemoveRepository}
                    updateFunction={this.handleUpdateRepoditory}
                />
            </Container>
        );
    }
}

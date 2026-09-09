package com.example.task1.exception;

public class DuplicateNominationException extends RuntimeException {

    public DuplicateNominationException(String message) {
        super(message);
    }
}